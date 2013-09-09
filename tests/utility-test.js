(function(){(function(k){function h(b,d,f){for(var a=0;a<d.length;a++)d[a]="weswit/"+d[a].replace(l,"");k("weswit/"+b,d,f)}var l=/^.\//;h("utility-test",[],function(){return"0.9"});h("AbstractTest",["Inheritance","EventDispatcher","LoggerManager"],function(b,d,f){function a(){this.initDispatcher()}a.l=f.getLoggerProxy("weswit.test");a.s=function(){return[]};a.prototype={start:function(){},end:function(){this.dispatchEvent("onTestCompleted")}};a.prototype.start=a.prototype.start;a.prototype.end=a.prototype.end;
a.testLogger=a.l;b(a,d);return a});h("ASSERT",["LoggerManager"],function(b){var d=b.getLoggerProxy("weswit.test"),f=0,a={};b={VOID:a,d:function(){return f},h:function(g,a,b){if(g.length!=a.length)return this.a(),d.logError("Wong length!",g,a),!1;if(b)for(c=0;c<g.length;c++){if(g[c]!=a[c])return d.logError("Wrong  element",g[c],a[c]),this.a(),!1}else{b={};for(var c=0;c<g.length;c++)b[g[c]]=1;for(c=0;c<a.length;c++)if(b[a[c]])b[a[c]]++;else return d.logError("Missing from first array",a[c]),this.a(),
!1;for(c in b)if(1==b[c])return d.logError("Missing from second array",b[c]),this.a(),!1}return!0},r:function(g,a,b,c,d){return this.f(g,a,b,c,!1,d)},n:function(a,b,d){return this.f(a,b,d,null,!0)},o:function(a){return null===a?(this.a(),d.logError("Not expecting a NULL",a),!1):!0},g:function(a,b,e){var c=!1;!0===e?c=a===b:e?c=e(a,b):isNaN(a)?c=a==b:(e=a&&a.charAt?a.charAt(0):null,c=b&&b.charAt?b.charAt(0):null,c="."==e||" "==e||"0"==e||"."==c||" "==c||"0"==c?String(a)==String(b):a==b);return c?!0:
(this.a(),d.logError("Expecting a different value",a,b),!1)},m:function(a,b,e){return(e?a===b:a==b)?(this.a(),d.logError("Expecting 2 different values",a,b),!1):!0},q:function(a){return a?!0:(this.a(),d.logError("Expecting a valid value"),!1)},p:function(a){return a?(this.a(),d.logError("Expecting a not valid value"),!1):!0},i:function(){d.logError("ASSERT failed");this.a();return!1},a:function(){f++},f:function(b,f,e,c,h,k){var m=!1,n=null,p=null;try{n=e!==a?b[f].apply(b,e):b[f]()}catch(l){m=!0,
p=l}b=h?"succes":"failure";return h!=m?(this.a(),d.logError("Unexpected",b,"for",f,e,c,p),!1):h||c===a?!0:this.g(n,c,k)}};b.getFailures=b.d;b.fail=b.i;b.verifyNotOk=b.p;b.verifyOk=b.q;b.verifyDiffValue=b.m;b.verifyNotNull=b.o;b.verifyValue=b.g;b.verifyException=b.n;b.verifySuccess=b.r;b.compareArrays=b.h;return b});h("TestRunner",["Inheritance","EventDispatcher","./ASSERT"],function(b,d,f){function a(){this.c=[];this.b=-1;this.initDispatcher()}a.prototype={k:function(a){this.c.push(a);a.addListener(this)},
size:function(){return this.c.length},start:function(){if(-1!=this.b)throw"Already started";if(0>=this.c.length)throw"No tests to run";this.e()},e:function(){this.b++;this.b>=this.c.length?(this.b=-1,this.dispatchEvent("onAllTestComplete",[f.d()])):(this.dispatchEvent("onTestStart",[this.b,this.c[this.b]]),this.c[this.b].start())},j:function(){this.dispatchEvent("onTestEnd",[this.b,this.c[this.b]]);this.e()}};a.prototype.onTestCompleted=a.prototype.j;a.prototype.start=a.prototype.start;a.prototype.pushTest=
a.prototype.k;a.prototype.size=a.prototype.size;b(a,d,!0);return a})})(define);}());
//# sourceMappingURL=utility-test.js.map