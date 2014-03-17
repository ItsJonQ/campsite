
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
    var comments = new Comments({
        el: '#chat-windows-phone-8-touch-response-comments',
        discussionID: 0
    });

};

// Start 'er up!!
init();