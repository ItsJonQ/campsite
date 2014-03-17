(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Defining the start message (testing Browserify)
var startMessage = require('./utils/utils.test');

var ToDos = require('./collections/collection.ToDos');

// Firing the startup message
startMessage();

// Requiring the ToDo collecton

window.a = new ToDos();

console.log(a);
},{"./collections/collection.ToDos":2,"./utils/utils.test":5}],2:[function(require,module,exports){
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
},{"../models/model.ToDo":3,"../utils/utils.fetch":4}],3:[function(require,module,exports){
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

    // fn: Initialize method that fires when the model is created
    this.initialize = function(attributes) {

        // extend (underscore) the default attributes if attributes have been defined when the model was created
        if(attributes && typeof attributes === 'object') {
            this.attributes = _.extend(this.attributes, attributes);
        }


    };

    // Fire the init method
    this.initialize(attributes);

};

// Exporting the model
module.exports = ToDo;
},{}],4:[function(require,module,exports){
// Fetch
// Fetch will be used to get fake data to populate the Basecamp dash

// Defining the fetch method
var fetch;

// Defining fetching of toDo
var toDo;

// Fetch will use the jQuery .ajax method to retrieve data

toDo = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.toDo.js';

    // Return the $.ajax method
    return $.ajax({
        dataType: 'json',
        url: url,
        success: function(data) {

            // Return the callback func if defined
            if(callback && typeof callback === 'function') {
                // Returning with data
                return callback(data);
            }
        }
    });

};

fetch = {
    toDo: toDo
};

// Exporting the fetch API
module.exports = fetch;
},{}],5:[function(require,module,exports){
module.exports = function() {
    return console.log('Start Campsite!');
};
},{}]},{},[1])