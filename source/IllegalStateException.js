define([],function() {

  /**
   * @exports IllegalStateException
   * Constructs an IllegalStateException with the specified detail message.
   * @constructor
   *
   * @param {String} message short description of the error.
   *
   * @class Thrown to indicate that a method has been invoked at an illegal or 
   * inappropriate time or that the internal state of an object is incompatible 
   * with the call.
   * <BR>Use toString to extract details on the error occurred.
   */
  var IllegalStateException = function(message) {

    /**
     * Name of the error, contains the "IllegalStateException" String.
     * 
     * @type String
     */
    this.name = "IllegalStateException";

    /**
     * Human-readable description of the error.
     * 
     * @type String
     */
    this.message = message;

  };

  IllegalStateException.prototype = {

      toString: function() {
        return ["[",this.name,this.message,"]"].join("|");
      }
      
  };
  
  return IllegalStateException;
  
});