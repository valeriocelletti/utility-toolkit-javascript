define([],function() {

  /**
   * @exports IllegalArgumentException
   * Constructs an IllegalArgumentException with the specified detail message.
   * @constructor
   *
   * @param {String} message short description of the error.
   *
   * @class Thrown to indicate that a method has been passed an illegal 
   * or inappropriate argument.
   * <BR>Use toString to extract details on the error occurred.
   */
  var IllegalArgumentException  = function(message) {
    
    /**
     * Name of the error, contains the "IllegalArgumentException" String.
     * 
     * @type String
     */
    this.name = "IllegalArgumentException";

    /**
     * Human-readable description of the error.
     * 
     * @type String
     */
    this.message = message;
   
  };
  
  IllegalArgumentException.prototype = {

      toString: function() {
        return ["[",this.name,this.message,"]"].join("|");
      }
      
  };
  
  return IllegalArgumentException;
  
});