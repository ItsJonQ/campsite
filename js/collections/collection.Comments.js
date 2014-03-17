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