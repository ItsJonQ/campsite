// Requiring events for campfire
var eventCampfire = require('./events.campfire.js');
var Campfire = require('../apps/app.Campfire');

// fn: Toggling Campfire with Keyboard
var campfireToggle = function() {
    document.addEventListener('keydown', function(e) {
        // if keyPress is "c" with the ALT key
        if(e.keyCode === 67 & e.altKey === true) {
            // Toggle campfire
            return eventCampfire.toggle();
        }

    });
};

// Bind the keypress Event to toggle Campfire
campfireToggle();