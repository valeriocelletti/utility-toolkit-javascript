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
define([],function() {
  
  /**
   * @exports List
   * Creates an empty List instance
   * @constructor
   * 
   * @class Very simple Array-backed List implementation.<br/>
   * It is discouraged the use of this class to handle big lists. 
   */
  var List = function() {
    this.data = [];
  };
  
  List.prototype = {
      
    /**
     * Adds the element to the end of the list (using Array.push).
     * Each element can be added multiple times; in such case it will be added to the list multiple times
     * 
     * @param {Object} newEl The element to be added
     */
    add: function(newEl) {
      this.data.push(newEl);
    },
    
    /**
     * Removes the first occurrence of the specified object in the List.<br/>
     * A linear search is performed to find the element; a non-strict comparison ( == )
     * is performed to identify the element. 
     * 
     * @param {Object} newEl The element to be removed
     * 
     * @returns {Boolean} true if element was found and deleted, false otherwise
     */
    remove: function(remEl) {
      for (var i=0; i<this.data.length; i++) {
        if (this.data[i] == remEl) {
          this.data.splice(i,1);
          return true;
        }
      }
      return false;
    },
    
    /**
     * Executes a given callback passing each element of the list as the only
     * call parameter.<br/>  
     * Callbacks are executed synchronously before the method returns: calling 
     * {@link #add} or {@link #remove} during callback execution may result in 
     * a wrong iteration.
     * 
     * @param {Function} cb The callback to be called.
     */
    forEach: function(cb) {
      for (var i=0; i<this.data.length; i++) {
        cb(this.data[i]);
      }
    },
    
    /**
     * Returns a copy of the internal array.
     * 
     * @returns {Array} A copy of the original array.
     */
    asArray: function() {
      return [].concat(this.data);
    },
    
    /**
     * Resets the list by re-instantiating the internal array.
     */
    clean: function() {
      this.data = [];
    }
    
  };
  
  //exports
  List.prototype["add"] = List.prototype.add;
  List.prototype["remove"] = List.prototype.remove;
  List.prototype["forEach"] = List.prototype.forEach;
  List.prototype["asArray"] = List.prototype.asArray;
  List.prototype["clean"] = List.prototype.clean;
  
  
  return List;
  
  
});