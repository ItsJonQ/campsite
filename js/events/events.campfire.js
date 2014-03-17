
// Getting the campfire icon from the DOM
var campfireIcon = document.getElementById('campfire-logo');

// fn: Method to toggle Campfire (show / hide)
var toggleCampfire = function() {
    document.body.classList.toggle('campfire-active');
};

// fn: Method to bind clicking the campfire icon to toggle Campfire
var campfireClickBind = function() {
    return campfireIcon.addEventListener('click', toggleCampfire);
};

// fn: Method to unbind clicking the campfire icon to toggle Campfire
var campfireClickUnbind = function() {
    return campfireIcon.removeEventListener('click', toggleCampfire);
};

// Exporting the methods
module.exports = {
    clickSet: campfireClickBind,
    clickUnset: campfireClickUnbind,
    el: campfireIcon,
    toggle: toggleCampfire
};
