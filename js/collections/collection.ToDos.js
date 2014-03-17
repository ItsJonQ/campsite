// Collections: ToDos

// Requiring the Fetch method
var fetch = require('../utils/utils.fetch');

// Requiring the to-do model
var ToDo = require('../models/model.ToDo');

// Defining the collection
var ToDos;

// Creating the collection constructor
ToDos = function() {

    // Defining the array collection to store models
    this.models = [];

    // Defining the location where data will be fetched from
    this.fetch = fetch.toDo;

    // Defining the initialize method
    this.initialize = function() {

        var self = this;

        // Fetch the data
        this.fetch(function(data) {

            // Define todo items from the data
            var todos = data.todos;

            // Looping through all the todo items
            for(var i = 0, len = todos.length; i < len; i++) {

                // Creating the new ToDo model
                var todo = new ToDo({
                    assigned: todos[i].assigned,
                    project: todos[i].project,
                    status: todos[i].status,
                    title: todos[i].title
                });

                // Adding the todo task to the models array
                self.add(todo);

            }

            // Returning the collection
            return this;

        });

    };

    // Firing the init method on creation of the collection
    this.initialize();

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

// Exporting the collection
module.exports = ToDos;