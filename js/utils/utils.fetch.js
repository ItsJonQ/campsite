// Fetch
// Fetch will be used to get fake data to populate the Basecamp dash

// Defining the fetch method
var fetch;

// Defining fetching of To-Do
var toDo;

// Defining fetching of Comments
var comments;

// Defining fetching of Messages
var messages;

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

fetch = {
    comments: comments,
    chatLog: chatLog,
    toDo: toDo
};

// Exporting the fetch API
module.exports = fetch;