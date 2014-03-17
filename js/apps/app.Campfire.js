
// Defining the init method
var campfireMessage;
var Messages = require('../collections/collection.Messages');

// Creating the Campfire messages
Campfire = new Messages({
    el: '#campfire-section'
});

module.exports = Campfire;