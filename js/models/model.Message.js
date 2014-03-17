// Model: Message

// Defining the model name
var Message;

// Creating the model constructor
Message = function(attributes) {

    // Setting the default attributes of the model
    this.attributes = {
        user: null,
        timestamp: null,
        message: null
    };

    // fn: Initialize method that fires when the model is created
    this.initialize = function(attributes) {

        // extend (underscore) the default attributes if attributes have been defined when the model was created
        if(attributes && typeof attributes === 'object') {
            this.attributes = _.extend(this.attributes, attributes);
        }

        // Returning the model
        return this;

    };

    // Fire the init method
    this.initialize(attributes);

};

// Exporting the model
module.exports = Message;