// Collections: ToDos

// Requiring the Fetch method
var fetch = require('../utils/utils.fetch');

// Requiring the to-do model
var ToDo = require('../models/model.ToDo');

// Defining the collection
var ToDos;

// Creating the collection constructor
ToDos = function() {

    // Defining the location where data will be fetched from
    this.fetch = fetch.toDo;

    // Defining the initialize method
    this.initialize = function() {

        // Fetch the data
        this.fetch(function(data) {

            console.log(data);

        });

    };

    // Firing the init method on creation of the collection
    this.initialize();

};

// Exporting the collection
module.exports = ToDos;