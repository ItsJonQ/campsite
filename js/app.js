// Defining the start message (testing Browserify)
var startMessage = require('./utils/utils.test');

var ToDos = require('./collections/collection.ToDos');

var Comments = require('./collections/collection.Comments');

// Firing the startup message
startMessage();

// Requiring the ToDo collecton

var toDoDueToday = new ToDos({ el: '#to-do-due-today' });
var toDoDueThisWeek = new ToDos({ el: '#to-do-due-this-week' });


var comments = new Comments({
    el: '#chat-windows-phone-8-touch-response-comments',
    discussionID: 0
});