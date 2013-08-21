define(["./Utils","./EnvironmentStatus","./EventHelper","./Environment"], 
    function(Utils,EnvironmentStatus,EventHelper,Environment){
    var step = 50;
    var newStuffFlag = false;
    var toBeExecuted = [];
    var now = Utils.getTimeStamp();
    var toBeRepeated = [];
    var timer = null;
    var nextId = 0;
    //var goodWakeups = 0;
    
    function sortFun(a,b) {
      if (a.time === b.time) {
        return a.orderId - b.orderId;
      }
      return a.time-b.time;
    }
    
    //TICK handling stuff
    var origin = Environment.isBrowserDocument() && document.location.protocol != "file:" ? (document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")) : "*";
    var generateTickExecution = function() { /*setTimeout(doTick,0); */ };
    var pendingGeneratedTick = false;
    function doTick() {
      pendingGeneratedTick = false;
      execute();
    }
    //we need to call this for urgent task as on FX5 and CH11 setInterval/setTimeout calls 
    //are made 1 per second on background pages (and our 50ms tick is based on a setInterval) 
    function generateTick() {
      if (!pendingGeneratedTick) {
        pendingGeneratedTick = true;
        generateTickExecution();
      }
    }
    
    
    function doInit() {
      if (!timer) {
        //set up the method to generate the tick
        //  on recent browsers we send a post message and trigger the doTick when we receive such message
        if (Environment.isBrowserDocument() && typeof postMessage != "undefined") {
          generateTickExecution = function() {
            window.postMessage("Lightstreamer.run",origin);
          };
          EventHelper.addEvent("message", function(event){
            if (event.data == "Lightstreamer.run" && origin == "*" || event.origin == origin) {
              doTick();
            }
          }, true);
        } else if (Environment.isNodeJS() && typeof process != "undefined" && process.nextTick) {
          //  on node versions having the nextTick method we rely on that
          generateTickExecution  = function() {
            process.nextTick(doTick);
          };
          
        } //  other cases will use the default implementation that's currently empty
        
      } else {
        clearInterval(timer);
      }
      
      //for "normal" tasks we use an interval
      timer = setInterval(execute,step);
    }
    
    
    //main execution method, the core of the Executor
    function execute() {
      if (EnvironmentStatus.unloaded) {
        clearInterval(timer);
        return;
      }
      
      //var last = now;
      now = Utils.getTimeStamp();
      //adjustTimer(last, now);
      
      if (toBeExecuted.length > 0) {
        if (newStuffFlag) {
          toBeExecuted.sort(sortFun);
          newStuffFlag = false;
        } //no new tasks = no need to sort
        
        var exeNow;
        while (toBeExecuted.length > 0 && toBeExecuted[0].time <= now && !EnvironmentStatus.unloaded) {
          exeNow = toBeExecuted.shift();
          if (exeNow.fun) {
            Executor.executeTask(exeNow);
            
            //prepare to re-enqueue repetetive tasks
            if (exeNow.step) {  
              toBeRepeated.push(exeNow);
            }
          } 
        }
      } 

      if (toBeExecuted.length <= 0) { //if queue is empty reset the index
        nextId = 0;
      }
      
      // re-enqueue repetetive tasks 
      var t;
      while(toBeRepeated.length > 0) {
        t = toBeRepeated.shift();
        t.orderId = nextId++;
        Executor.addPackedTimedTask(t,t.step,true);
      }
      
     
    }

    /**
     * An Executor based on a single setInterval that is triggered every 50ms to dequeue expired tasks.
     * When 0ms tasks are enqueued a postMessage call is used to trigger an immediate execution; on nodejs
     * the process.nextTick method is used in place of the postMessage; on older browser where postMessage
     * is not supported no action is taken.
     * 
     * @exports Executor
     * @extends ExecutorInterface
     */
    var Executor = {  
      
      toString: function() {
        return ["[","Executor",step,toBeExecuted.length,/*this.goodWakeups,*/"]"].join("|");
      },
     
    
      getQueueLength: function() {
        return toBeExecuted.length;
      },
      
      packTask: function(fun,context,params) {
        return {fun:fun,context:context||null,params:params||null,orderId:nextId++};
      },
      
      addPackedTimedTask: function(task,time,repetitive) {
        task.step = repetitive ? time : null;
        task.time = now + parseInt(time);
        if (isNaN(task.time)) {
          throw "Executor error time: " + task.time;
        }
        toBeExecuted.push(task);
        newStuffFlag = true;
      },
      
      addRepetitiveTask: function(fun,interval,context,params) {
        return this.addTimedTask(fun,interval,context,params,true);
      },

      stopRepetitiveTask: function(task) {
        if (!task) {
          return;
        }
        task.fun = null;
        task.step = null;
      },

      addTimedTask: function(fun,time,context,params,repetitive) {
        var task = this.packTask(fun,context,params);
        this.addPackedTimedTask(task,time,repetitive);
        if (time == 0) {
          generateTick();
        }
        return task;
      },
      
      modifyTaskParam: function(task,index,newParam) {
        task.params[index] = newParam;
      },
      
      modifyAllTaskParams: function(task,extParams) {
        task.params = extParams;
      },
      
      delayTask: function(task,delay) {
        task.time += delay;
        newStuffFlag = true;
      },
      
      executeTask: function(task,extParams) {
        try {

            //IE doesn't like the simple form when useParams is null:
            //task.fun.apply(task.context, task.params);
            //if we leave the above code instead of using the below code, we fall into IE weird problem, where
            //the execution fails in exception, task.fun results not null nor undefined, but if we try to print it 
            //(toString) or call it results as undefined (exception "Object expected").
          
          var useParams = extParams || task.params;
          
          if (task.context) {
            if (useParams) {
              task.fun.apply(task.context, useParams);
            } else {
              task.fun.apply(task.context);
            }
          } else if (useParams) {
            task.fun.apply(null, useParams);
          } else {
            task.fun();
          }
          
        } catch (_e) {
          var sendName = null;
          try {
            sendName = task.fun.name || task.fun.toString();
          } catch(_x) {
          }
          //TODO report sendName
        } 
        
      }
      
   };
   
   if (Environment.isWebWorker()) {
     //we need this workaround otherwise on firefox 10 the Executor may not run as expected.
     //I wasn't able to create a simple test case as it seems that the number of classes involved
     //and the loading order have an impact on the issue (so that it is possible that once built the
     //issue will not be there)
     //I don't want to include BrowserDetection here so that I apply the workaround on all browsers
     setTimeout(doInit,1);
     
     //other possible workarounds (referring to the failing test)
     //that make the Executor run correctly:
     // *do not include Subscription
     // *do not include the descriptor classes (inside the library code)
     // *set the step value to a higher value (75 and 100 are suggested values that seem to work)
     
   } else {
     doInit();
   }
   

   return Executor;

});   
 
 
/*
      function adjustTimer(last, now) {
        var diff = now - last;
        
        if (diff <= step) {
          goodWakeups++;
        } else {
          goodWakeups--;
        }
        
        if (goodWakeups >= 10) {
          changeStep(step+1);
          goodWakeups = 0;
        } else if (goodWakeups < 0) {
          if (step >= 2) {
            changeStep(Math.round(step / 2));
            goodWakeups = 0;
          } else {
            goodWakeups = 0;
          }
        }
      }
      
      function changeStep (newStep) {
        step = newStep;
        doInit();
      }
*/