// This is how you require a component from node_modules
// Make sure to add it to the vendors in /src/scripts/vendor.js
const mediaQuery = require('sensible/mediaQuery');

// This is how you require your component script:
require('components/header/script');

// The code for the website comes here.
if (mediaQuery.isNot('mobile')) {
  console.log("I'm a not a mobile");
}
