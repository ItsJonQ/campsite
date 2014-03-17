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