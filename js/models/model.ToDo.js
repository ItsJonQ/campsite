// Model: ToDo

// Defining the model name
var ToDo;

// Creating the model constructor
ToDo = function(attributes) {

    // Setting the default attributes of the model
    this.attributes = {
        assigned: null,
        status: 'incomplete',
        project: null,
        title: null
    };

    this.doneStatus = false;

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

ToDo.prototype.toggleDone = function() {

    if(this.status !== 'done') {
        this.status = 'done';
    } else {
        this.status = 'incomplete';
    }

    return this;
};

// Exporting the model
module.exports = ToDo;