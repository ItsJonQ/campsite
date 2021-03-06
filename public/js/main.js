(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// Defining the init method
var init;

var campfireMessage;

init = function() {

    // Defining the start message (testing Browserify)
    var startMessage = require('./utils/utils.test');

    // Firing the startup message
    startMessage();


    // Requiring the collection constructors
    var ToDos = require('./collections/collection.ToDos');
    var Comments = require('./collections/collection.Comments');
    var Messages = require('./collections/collection.Messages');

    // Requiring the chatBot
    var chatBot = require('./modules/chatBot');

    // Requiring events
    var events = require('./events/events');


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

    // Startin up the chatBot!
    // chatBot.init();


};

// Start 'er up!!
init();

},{"./collections/collection.Comments":3,"./collections/collection.Messages":4,"./collections/collection.ToDos":5,"./events/events":7,"./modules/chatBot":12,"./utils/utils.test":14}],2:[function(require,module,exports){

// Defining the init method
var campfireMessage;
var Messages = require('../collections/collection.Messages');

// Creating the Campfire messages
Campfire = new Messages({
    el: '#campfire-section'
});

module.exports = Campfire;
},{"../collections/collection.Messages":4}],3:[function(require,module,exports){
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
},{"../models/model.Comment":9,"../utils/utils.fetch":13}],4:[function(require,module,exports){
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

    this.message = ko.observable();

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

            // Render the view of the chat
            self.render();

            // Returning the collection
            return self;

        });

    };

    // Firing the init method on creation of the collection
    this.initialize(attributes);

};

// fn: Rendering the view of the chat log
Messages.prototype.render = function() {
    // Return false if $el is not defined
    if(!this.$el) return false;

    // Scroll the parent container to the bottom
    var el = this.$el.find('#campfire-chat-log')[0];
    el.parentNode.scrollTop = el.clientHeight;

    // Returning the collection
    return this;

};

// fn: Adding a model to the collection
Messages.prototype.add = function(model) {
    // Return false if model is not defined
    if(!model) return false;

    // Adding the model to the models array
    this.models.push(model);

    // Re-render the view everytime a new chat message is added
    this.render();

    // Returning the collection
    return this;
};

// fn: adding a new message to the collection
Messages.prototype.addNewMessage = function(model) {
    var self = this;

    // If model is defined, add the model to the collection
    if(model !== self) return self.add(model);

    // Defining the message (creating a copy of the one bound to the collection)
    var msg = self.message();

    // Return false if message is not defined
    if(!msg) return false;

    // Creating the new message model and adding it via the add method
    self.add(
        new Message({
            user: 'Jon Q',
            message: msg,
            timestamp: ''
            })
    );

    // Reseting the message value
    self.message(null);

    // Returning the collection
    return this;

};


// fn: Setting the $el of the model
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
},{"../models/model.Message":10,"../utils/utils.fetch":13}],5:[function(require,module,exports){
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
},{"../models/model.ToDo":11,"../utils/utils.fetch":13}],6:[function(require,module,exports){

// Getting the campfire icon from the DOM
var campfireIcon = document.getElementById('campfire-logo');

// fn: Method to toggle Campfire (show / hide)
var toggleCampfire = function() {
    document.body.classList.toggle('campfire-active');
};

// fn: Method to bind clicking the campfire icon to toggle Campfire
var campfireClickBind = function() {
    return campfireIcon.addEventListener('click', toggleCampfire);
};

// fn: Method to unbind clicking the campfire icon to toggle Campfire
var campfireClickUnbind = function() {
    return campfireIcon.removeEventListener('click', toggleCampfire);
};

// Exporting the methods
module.exports = {
    clickSet: campfireClickBind,
    clickUnset: campfireClickUnbind,
    el: campfireIcon,
    toggle: toggleCampfire
};

},{}],7:[function(require,module,exports){

// Requiring events for campfire
var eventCampfire = require('./events.campfire.js');

var eventKeypress = require('./events.keypress.js');



var init = function() {
    eventCampfire.clickSet();
};

// Initialize events to setup handlers
init();

// Exporting events
module.exports = {
    campfire: eventCampfire
};
},{"./events.campfire.js":6,"./events.keypress.js":8}],8:[function(require,module,exports){
// Requiring events for campfire
var eventCampfire = require('./events.campfire.js');
var Campfire = require('../apps/app.Campfire');

// fn: Toggling Campfire with Keyboard
var campfireToggle = function() {
    document.addEventListener('keydown', function(e) {
        // if keyPress is "c" with the ALT key
        if(e.keyCode === 67 & e.altKey === true) {
            // Toggle campfire
            return eventCampfire.toggle();
        }

    });
};

// Bind the keypress Event to toggle Campfire
campfireToggle();
},{"../apps/app.Campfire":2,"./events.campfire.js":6}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
// ChatBot (Used to automatically add messages to Campfire for demo)

// Requiring Campfire (Collection)
var Campfire = require('../apps/app.Campfire');

// Requiring the Message model
var Message = require('../models/model.Message');

// Requiring the fetch util
var fetch = require('../utils/utils.fetch');

// Fetch the chatbot Data
var init = function() {
    // Return the fetch to chatbot
    return fetch.chatBot(function(data) {

        // fn: Generating the message model from the random data
        var autoMessage = function() {
            var msg = new Message(_.sample(data.messages, 1)[0]);
            return Campfire.addNewMessage(msg);
        };

        // Loop: Rnadom loop to insert messages into campfire
        (function loop() {

            // Random integer
            var rand = Math.round(Math.random() * (3000 - 500)) + 1500;

            // Set timeout method with random integer
            setTimeout(function() {

                // Fire the autoMessage method
                autoMessage();

                // Self invoke the loop() to keep it going
                loop();

            }, rand);

        })();

    });

};

init();

// Export the init method
module.exports = init;



},{"../apps/app.Campfire":2,"../models/model.Message":10,"../utils/utils.fetch":13}],13:[function(require,module,exports){
// Fetch
// Fetch will be used to get fake data to populate the Basecamp dash

// Defining the default ajax method
var ajax;

// Defining fetching of To-Do
var toDo;

// Defining fetching of Comments
var comments;

// Defining fetching of Messages
var messages;
var chatBot;

// Fetch will use the jQuery .ajax method to retrieve data

ajax = function(url, callback) {

    // Return false if url is not defined
    if(!url) return false;

    // Return the $.ajax method
    return $.ajax({
        dataType: 'json',
        url: url,
        error: function() {
            return console.log("There was a problem!");
        },
        success: function(data) {

            // Return the callback func if defined
            if(callback && typeof callback === 'function') {
                // Returning with data with callback
                return callback(data);
            }

            // Return the data
            return data;

        }
    });

};

toDo = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.toDo.js';

    // Returning the ajax call
    return ajax(url, callback);

};


comments = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.discussion.js';

    // Returning the ajax call
    return ajax(url, callback);

};


chatLog = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.chatLog.js';

    // Returning the ajax call
    return ajax(url, callback);

};

chatBot = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.chatBot.js';

    // Returning the ajax call
    return ajax(url, callback);

};

// Exporting the fetch API
module.exports = {
    ajax: ajax,
    comments: comments,
    chatLog: chatLog,
    chatBot: chatBot,
    toDo: toDo
};
},{}],14:[function(require,module,exports){
module.exports = function() {
    return console.log('Start Campsite!');
};
},{}]},{},[1])