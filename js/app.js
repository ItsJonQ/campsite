
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
