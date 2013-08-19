/*
  Copyright 2013 Weswit Srl

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
define([], function(){
  
  /**
   * @method
   * 
   * @param {Object} o
   * @param {Function} tc
   * @param {Array} params
   * 
   * @private
   */
  function doCall(o,tc,params) {
    if (tc) {
      if (params) {
        return tc.apply(o,params);
      } else {
        return tc.apply(o);
      }
    }
  }
  
  /**
   * This module introduce a "classic" inheritance mechanism as well as an helper to
   * copy methods from one class to another. See the Inhertiance method documentation below for details.
   * @exports Inheritance
   */
  var Inheritance = {
      
    /**
     * This method extends a class with the methods of another class preserving super
     * methods and super constructor. This method should be called on a class only
     * after its prototype is already filled, otherwise
     * super methods may not work as expected.<br/>
     * The <i>_super_</i>, <i>_callSuperMethod</i> and <i>_callSuperConstructor</i> names are reserved: extending and
     * extended classes' prototypes must not define properties with such names.<br/>
     * Once extended it is possible to call the super constructor calling the _callSuperConstructor
     * method and the super methods calling the _callSuperMethod method
     * <br/>Note that this function is the module itself (see the example)
     *
     * @param {Function} subClass the class that will extend the superClass
     * @param {Function} superClass the class to be extended
     * @param {boolean} lightExtension if true constructor and colliding methods of the
     * super class are not ported on the subclass hence only non-colliding methods will be copied
     * on the subclass
     * @static
     * 
     * @example
     * require(["Inheritance"],function(Inheritance) {
     *   function Class1() {
     *   }
     *
     *   Class1.prototype = {
     *     method1: function(a) {
     *       return a+1;
     *     }
     *   };
     * 
     *   function Class2() {
     *     this._callSuperConstructor(Class2);
     *   }
     *
     *   Class2.prototype = {
     *     method1: function(a,b) {
     *       return this._callSuperMethod(Class2,"method1",[a])+b;
     *     }
     *   };
     *
     *   Inheritance(Class2,Class1);
     *   
     *   var class2Instance = new Class2();
     *   class2Instance.method1(1,2); //returns 4
     *   
     * });
     */
    Inheritance: function(subClass, superClass, lightExtension){
      //iterate all of superClass's methods
      for (var i in superClass.prototype) {
        if (!subClass.prototype[i]) {
          //copy non-colliding methods directly
          subClass.prototype[i] = superClass.prototype[i];
        }
      }
     
      if (!lightExtension) {
        //setup the extended class for super calls (square brakets used to support google closure)
        subClass.prototype["_super_"] = superClass;
        subClass.prototype["_callSuperConstructor"] = Inheritance._callSuperConstructor;
        subClass.prototype["_callSuperMethod"] = Inheritance._callSuperMethod;
      }
      
    },
    
    /**
     * This method is attached to the prototype of each extended class as _callSuperMethod to make it possible to
     * call super methods. 
     * <br/>Note that it is not actrually visible in this module.
     * 
     * @param {Function} ownerClass the class that calls this method.
     * @param {String} toCall the name of the super function to be called.
     * @param {Array} params array of parameters to be used to call the super method.
     * @static
     */
    _callSuperMethod: function(ownerClass, toCall, params){
      return doCall(this,ownerClass.prototype["_super_"].prototype[toCall],params);
    },
    
    /**
     * This method is attached to the
     * prototype of each extended class as _callSuperConstructor to make it possible
     * to call the super constructor.
     * <br/>Note that it is not actrually visible in this module.
     *
     * @param {Function} ownerClass the class that calls this method.
     * @param {Array} params array of parameters to be used to call the super constructor.
     * @static
     */
    _callSuperConstructor: function(ownerClass, params){
      doCall(this,ownerClass.prototype["_super_"], params);
    }
  
  
  };
  
  //the way this is handled may look weird, well it is, I had to put
  //things this way with the only purpose to let JSDoc document the module
  //as I wanted to (and that didn't even turned out perfectly)
  return Inheritance.Inheritance;

});