// ChatBot (Used to automatically add messages to Campfire for demo)

// Requiring Campfire (Collection)
var Campfire = require('../apps/app.Campfire');

// Requiring the Message model
var Message = require('../models/model.Message');

// Requiring the fetch util
var fetch = require('../utils/utils.fetch');

// Fetch the chatbot Data
var init = function() {
    // Return the fetch to chatbot
    return fetch.chatBot(function(data) {

        // fn: Generating the message model from the random data
        var autoMessage = function() {
            var msg = new Message(_.sample(data.messages, 1)[0]);
            return Campfire.addNewMessage(msg);
        };

        // Loop: Rnadom loop to insert messages into campfire
        (function loop() {

            // Random integer
            var rand = Math.round(Math.random() * (3000 - 500)) + 1500;

            // Set timeout method with random integer
            setTimeout(function() {

                // Fire the autoMessage method
                autoMessage();

                // Self invoke the loop() to keep it going
                loop();

            }, rand);

        })();

    });

};

init();

// Export the init method
module.exports = init;


