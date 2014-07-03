/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    function isTouchDevice() {
      try {
        document.createEvent('TouchEvent');
        return true;
      } catch (e) {
        return false;
      }
    }

    $('body').addClass('js');

    require(['mymodule'], function () {
        console.log('mymodule is loaded');
        isTouchDevice(); // TODO: remove this, is just to pass eslint
    });

})();

