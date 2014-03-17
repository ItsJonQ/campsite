// Defining the start message (testing Browserify)
var startMessage = require('./utils/utils.test');

var fetch = require('./utils/utils.fetch');

// Firing the startup message
startMessage();

// Requiring the ToDo model
var ToDo = require('./models/model.ToDo');

window.v = new ToDo();


fetch.toDo(function(data) {
    console.log(data);
});