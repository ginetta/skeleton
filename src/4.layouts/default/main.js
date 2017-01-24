'use strict';

 // This is how you require your component script
 require('modules/intro/script');

 // This is how you require a component from node_modules
 // Make sure to add it to the vendors in vendor.js
var mediaQuery = require('sensible/mediaQuery');
if (mediaQuery.isNot('mobile')){
  console.log("I'm a not a mobile");
}
