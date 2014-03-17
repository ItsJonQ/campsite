// Collections: ToDos

// Requiring the Fetch method
var fetch = require('../utils/utils.fetch');

// Requiring the to-do model
var ToDo = require('../models/model.ToDo');

// Defining the collection
var ToDos;

// Creating the collection constructor
ToDos = function(attributes) {

    // Defining the array collection to store models
    this.models = ko.observableArray([]);

    // Defining the location where data will be fetched from
    this.fetch = fetch.toDo;

    // Defining the el of the collection
    this.el = null;

    // Defining the cached $el, based on el
    this.$el = null;

    // Defining the list ID
    this.listID = null;

    // Defining the list (To-do title)
    this.list = null;

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

            // Return false if the discussionID was not defined
            if(self.listID === null) return false;

            // Defining and setting the $El for the collection
            self.set$el();

            // Defining the to-do list from the data
            var todoList = data.todos[self.listID];

            // Define todo items from the data
            var todos = todoList.todos;

            // Set the todo list title if applicable
            if(todoList.list) self.list = todoList.list;

            // Looping through all the todo items
            for(var i = 0, len = todos.length; i < len; i++) {

                // Creating the new ToDo model
                var todo = new ToDo(todos[i]);

                // Adding the todo task to the models array
                self.add.call(self, todo);

            }

            // knockout bind this collection
            ko.applyBindings(self, self.$el[0]);

            // Make the collection sortable
            self.makeSortable.call(self);

            // Returning the collection
            return self;

        });

    };

    // fn: Method to mark todo item as done
    this.toggleDone = function(model, event) {

        // Getting the DOM target from the click event
        var target = $(event.target).closest('.to-do-task');
        // Toggling the "complete" class
        target.toggleClass('complete');
        // Toggling the model's done status
        model.doneStatus ^= model.doneStatus;
        // Init the model's doneStatus method
        model.toggleDone();

        // Returning a boolean to update the check box
        return true;

    };

    // Firing the init method on creation of the collection
    this.initialize(attributes);

};

// fn: Adding a model to the collection
ToDos.prototype.add = function(model) {
    // Return false if model is not defined
    if(!model) return false;

    // Adding the model to the models array
    this.models.push(model);

    // Returning the collection
    return this;
};

ToDos.prototype.set$el = function() {

    // Return the $el if it has already been set
    if(this.$el) return this.$el;

    // Set the $el if applicable
    if(this.$el === null && this.el) this.$el = $(this.el);

    // Return false if the $el is not valid
    if(!this.$el) return false;

    return this;

};

// fn: Method to allow jQuery UI sortable for list
ToDos.prototype.makeSortable = function() {

    // Return false if the todo list in empty
    if(!this.models.length && !this.$el) return false;

    this.$el.find('.to-do-list').sortable({ connectWith: '.to-do-list' }).disableSelection();

    return this;

};



// Exporting the collection
module.exports = ToDos;