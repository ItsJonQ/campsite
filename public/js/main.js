(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// Defining the init method
var init;

init = function() {

    // Defining the start message (testing Browserify)
    var startMessage = require('./utils/utils.test');

    // Firing the startup message
    startMessage();


    // Requiring the collection constructors
    var ToDos = require('./collections/collection.ToDos');
    var Comments = require('./collections/collection.Comments');


    // Creating the todo lists
    var toDoDueToday = new ToDos({
        el: '#to-do-due-today',
        listID: 0
    });

    var toDoDueThisWeek = new ToDos({
        el: '#to-do-due-this-week',
        listID: 1
    });

    // Creating the comments
    var commentsWindowsPhone = new Comments({
        el: '#chat-windows-phone-8-touch-response',
        discussionID: 0
    });

    // Creating the comments
    var commentsSnacks = new Comments({
        el: '#chat-snacks-what-to-get',
        discussionID: 1
    });

    // Creating the comments
    var commentsSEO = new Comments({
        el: '#chat-seo-tips',
        discussionID: 2
    });

};

// Start 'er up!!
init();
},{"./collections/collection.Comments":2,"./collections/collection.ToDos":3,"./utils/utils.test":7}],2:[function(require,module,exports){
// Collections: Comments

// Requiring the Fetch method
var fetch = require('../utils/utils.fetch');

// Requiring the to-do model
var Comment = require('../models/model.Comment');

// Defining the collection
var Comments;

// Creating the collection constructor
Comments = function(attributes) {

    // Defining the array collection to store models
    this.models = ko.observableArray();

    // Defining the location where data will be fetched from
    this.fetch = fetch.comments;

    // Defining the el of the collection
    this.el = null;

    // Defining the cached $el, based on el
    this.$el = null;

    // Defining the discussion ID
    this.discussionID = null;

    // Defining the todo (Discussion title)
    this.todo = null;

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
            if(self.discussionID === null) return false;

            // Defining and setting the $El for the collection
            self.set$el();

            // Defining the discussion thread
            var discussion = data.discussions[self.discussionID];

            // Set the todo discussion title if applicable
            if(discussion.todo) self.todo = discussion.todo;

            // Define comment items from the data
            var comments = discussion.chat;

            // Looping through all the comment items
            for(var i = 0, len = comments.length; i < len; i++) {

                // Creating the new comment model
                var comment = new Comment(comments[i]);

                // Adding the comment task to the models array
                self.add.call(self, comment);

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
Comments.prototype.add = function(model) {
    // Return false if model is not defined
    if(!model) return false;

    // Adding the model to the models array
    this.models.push(model);

    // Returning the collection
    return this;
};

Comments.prototype.set$el = function() {

    // Return the $el if it has already been set
    if(this.$el) return this.$el;

    // Set the $el if applicable
    if(this.$el === null && this.el) this.$el = $(this.el);


    // Return false if the $el is not valid
    if(!this.$el) return false;

    return this;

};

// Exporting the collection
module.exports = Comments;
},{"../models/model.Comment":4,"../utils/utils.fetch":6}],3:[function(require,module,exports){
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

    // this.$el.sortable({ connectWith: '.to-do-list' }).disableSelection();

    return this;

};



// Exporting the collection
module.exports = ToDos;
},{"../models/model.ToDo":5,"../utils/utils.fetch":6}],4:[function(require,module,exports){
// Model: Comment

// Defining the model name
var Comment;

// Creating the model constructor
Comment = function(attributes) {

    // Setting the default attributes of the model
    this.attributes = {
        user: null,
        date: null,
        comment: null
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
module.exports = Comment;
},{}],5:[function(require,module,exports){
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

// fn: Toggling the model's done Status
ToDo.prototype.toggleDone = function() {

    if(this.status !== 'done') {
        this.status = 'done';
    } else {
        this.status = 'incomplete';
    }

    // Returning the model
    return this;
};

// Exporting the model
module.exports = ToDo;
},{}],6:[function(require,module,exports){
// Fetch
// Fetch will be used to get fake data to populate the Basecamp dash

// Defining the fetch method
var fetch;

// Defining fetching of toDo
var toDo;

// Defining fetching of Comments
var comments;

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


comments = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.discussion.js';

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
    comments: comments,
    toDo: toDo
};

// Exporting the fetch API
module.exports = fetch;
},{}],7:[function(require,module,exports){
module.exports = function() {
    return console.log('Start Campsite!');
};
},{}]},{},[1])