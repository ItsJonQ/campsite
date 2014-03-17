// Collections: Messages

// Requiring the Fetch method
var fetch = require('../utils/utils.fetch');

// Requiring the message model
var Message = require('../models/model.Message');

// Defining the collection
var Messages;

// Creating the collection constructor
Messages = function(attributes) {

    // Defining the array collection to store models
    this.models = ko.observableArray();

    // Defining the location where data will be fetched from
    this.fetch = fetch.chatLog;

    // Defining the el of the collection
    this.el = null;

    // Defining the cached $el, based on el
    this.$el = null;

    // Defining the initialize method
    this.initialize = function(attributes) {

        var self = this;

        // Fetch the data
        this.fetch(function(data) {

            // Return false if data is not defined
            if(!data) return false;

            // Set the attributes if defined
            if(attributes && typeof attributes === 'object') {
                self = _.extend(self, attributes);
            }

            // Defining and setting the $El for the collection
            self.set$el();

            // Looping through all the message items
            for(var i = 0, len = data.messages.length; i < len; i++) {

                // Creating the new message model
                var message = new Message(data.messages[i]);

                // Adding the message task to the models array
                self.add.call(self, message);

            }

            // knockout bind this collection
            ko.applyBindings(self, self.$el[0]);

            // Returning the collection
            return self;

        });

    };

    // Firing the init method on creation of the collection
    this.initialize(attributes);

};

// fn: Adding a model to the collection
Messages.prototype.add = function(model) {
    // Return false if model is not defined
    if(!model) return false;

    // Adding the model to the models array
    this.models.push(model);

    // Returning the collection
    return this;
};

Messages.prototype.set$el = function() {

    // Return the $el if it has already been set
    if(this.$el) return this.$el;

    // Set the $el if applicable
    if(this.$el === null && this.el) this.$el = $(this.el);


    // Return false if the $el is not valid
    if(!this.$el) return false;

    return this;

};

// Exporting the collection
module.exports = Messages;