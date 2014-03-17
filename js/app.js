// Defining the start message (testing Browserify)
var startMessage = require('./utils/utils.test');

var ToDos = require('./collections/collection.ToDos');

// Firing the startup message
startMessage();

// Requiring the ToDo collecton

window.a = new ToDos();

console.log(a);