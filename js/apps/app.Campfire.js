
// Defining the init method
var campfireMessage;
var Messages = require('../collections/collection.Messages');

// Creating the Campfire messages
Campfire = new Messages({
    el: '#campfire-section'
});

$('#campfire-logo').on('click', function() {
    $('body').toggleClass('campfire-active');
});

module.exports = Campfire;