
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