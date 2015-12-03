'use strict';

// This is how you require your component script:
require('elements/header/script');

// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
var mediaQuery = require('sensible/mediaQuery');

// The code for the website comes here.
if ( mediaQuery.isNot('mobile') ){
  console.log("I'm a not a mobile")
}


