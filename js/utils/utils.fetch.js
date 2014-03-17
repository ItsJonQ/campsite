// Fetch
// Fetch will be used to get fake data to populate the Basecamp dash

// Defining fetching of To-Do
var toDo;

// Defining fetching of Comments
var comments;

// Defining fetching of Messages
var messages;
var chatBot;

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


chatLog = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.chatLog.js';

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

chatBot = function(callback) {

    // Defining the URl to fetch from
    var url = 'js/data/testData.chatBot.js';

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

// Exporting the fetch API
module.exports = {
    comments: comments,
    chatLog: chatLog,
    chatBot: chatBot,
    toDo: toDo
};