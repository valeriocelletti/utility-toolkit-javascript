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
   * @exports Matrix
   * Creates a Matrix instance; if specified the matrix is initialized with the given object.
   * @constructor
   * 
   * @param {Object} inputMatrix the matrix to initialize this object with.
   * 
   * @class Very simple object-backed bi-dimensional Matrix implementation.
   */
  var Matrix = function(inputMatrix) {
    /**
     * @private
     */
    this.matrix = inputMatrix || {};
  };
  
  
  Matrix.prototype = {
    /**
     * Inserts an element in the matrix. If another element is already present in the
     * specified position it is overwritten.
     * 
     * @param insObject {Object} the element to be added.
     * @param row {String|Number} the row in the matrix where the element is placed.
     * @param column {String|Number} the column in the row where the element is placed.
     */ 
    insert: function(insObject,row,column) {
      if (!this.matrix[row]) {
        this.matrix[row] = {};
      }
      this.matrix[row][column] = insObject;
    },
    
    /**
     * Gets the element at the specified position in the matrix. If the position is empty null is returned.
     * @param row {String|Number} the row in the matrix where the element is located.
     * @param column {String|Number} the column in the row where the element is located.
     * @returns {Object} the element at the specified location or null.
     */
    get: function(row,column) {
      if (!this.matrix[row]) {
        return null;
      }
      if (typeof this.matrix[row][column] == "undefined") {
        return null;
      }
      return this.matrix[row][column];
    },
    /**
     * Removes the element at the specified position in the matrix.
     * @param row {String|Number} the row in the matrix where the element is located.
     * @param column {String|Number} the column in the row where the element is located.
     */
    del: function(row, column) {
      if (!this.matrix[row]) {
        return;
      }
      if (this.matrix[row][column]) {
        delete (this.matrix[row][column]);
      }
        
      for (var i in this.matrix[row]) {
        //at least a cell in the row
        return;
      }
      //row is empty, get rid of it
      delete (this.matrix[row]);
    },
    /**
     * Inserts a full row in the matrix. If another row is already present in the
     * specified position it is overwritten.
     *  
     * @param insRow {Object} the row to be added.
     * @param row {String|Number} the row position.
     */
    insertRow: function(insRow, row) {
      this.matrix[row] = insRow;
    },
    /**
     * Gets a full row from the matrix. Note that the actual row object is returned so 
     * that any change performed on it will reflect on the Matrix itself
     * 
     * @param row {String|Number} the row position.
     * @returns the full row or null.
     */
    getRow: function(row) {
      if (!this.matrix[row]) {
        return null;
      }
      return this.matrix[row];
    },
    /*
    extractRow: function(row) {
      var retVal = this.getRow(row);
      this.delRow(row);
      return retVal;
    },*/
    /**
     * Removes the row at the specified position in the matrix.
     * @param row {String|Number} the row position.
     */
    delRow: function(row) {
      if (!this.matrix[row]) {
        return;
      }
      delete (this.matrix[row]);
    },
    /**
     * Gets a full matrix. Note that the actual internal matrix is returned so 
     * that any change performed on it will reflect on the Matrix itself
     * @returns the full internal matrix.
     */
    getEntireMatrix: function() {
      return this.matrix;  
    }
    
  };
  
  Matrix.prototype["insert"] = Matrix.prototype.insert; 
  Matrix.prototype["get"] = Matrix.prototype.get;
  Matrix.prototype["del"] = Matrix.prototype.del;
  Matrix.prototype["insertRow"] = Matrix.prototype.insertRow;
  Matrix.prototype["getRow"] = Matrix.prototype.getRow;
  Matrix.prototype["delRow"] = Matrix.prototype.delRow;
  Matrix.prototype["getEntireMatrix"] = Matrix.prototype.getEntireMatrix;
  
  return Matrix;
  
});  