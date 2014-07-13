/*
    Usage:

    mediaQuery.onEnter('mobile tablet', function(querry){
      console.log(querry);
    },true);

    mediaQuery.onLeave('mobile', function(querry){
      console.log(querry);
    },true);

    if ( mediaQuery.is('mobile') ){
      console.log('I'm a mobile)
    }

    if ( mediaQuery.isNot('mobile') ){
      console.log('I'm a mobile)
    }

    todo:
      - debounce
*/

define(['jquery'],function($){
  'use strict';

  var mediaQuery,
  // vars
      querryJSONString, querries, events, currentMatches, $ref,
  // functions
      parseJSONString, addEvent, match, callEvents;

  // will contain all the media queries:
  // {'mobile': 'only screen and (min-width: 500px)', ...}
  querries = {};

  // callbacks for enter and leave
  events = {};

  // currently matching querries
  currentMatches = [];

  // parses the JSON given fromt the CSS
  parseJSONString = function (querryJSONString) {
    return $.parseJSON(querryJSONString.substring(1, querryJSONString.length-1) );
  };

  // checks if queryKey exists in querries and if matchMedia matches
  match = function (queryKey) {
    return querries.hasOwnProperty(queryKey) && window.matchMedia( querries[queryKey] ).matches;
  };

  //triggers the callbacks and updates the current matches

  callEvents = function (callback) {
    var wasCalled = [];

    $.each(events, function (queryKey, callbacks) {

      $.each(callbacks, function () {
        if (callback && callback !== this) {
          return;
        }

        if ($.inArray(this, wasCalled) !== -1) {
          return;
        }

        if ((match(queryKey) && this.type === "enter" && !this.current) || (!match(queryKey) && this.type === "leave" && !this.current)) {
          this.current = true;
          this.callback(queryKey);
          wasCalled.push(this);
        } else if ((!match(queryKey) && this.type === "enter" && this.current) || (match(queryKey) && this.type === "leave" && this.current)) {
          this.current = false;
          return;
        }

      });
    });
  };

  //adds an event to the callbacks to the events object
  addEvent = function( type,queryKey,callback,callOnAdd ){
    var i, triggers, trigger;

    triggers = queryKey.split(" ");
    for (i = 0; i < triggers.length; ++i ){
      trigger = triggers[i];
      if( !events.hasOwnProperty(trigger) ) {
        events[trigger] = [];
      }
      events[trigger].push({callback: callback, type: type, current: match(queryKey)});
    }

    if( callOnAdd ) {
      callEvents(callback);
    }
  };

  $(window).on('resize.mediaQuery', function(){
    callEvents();
  });

  //creationg a dom element to read the content set by the CSS
  $ref = $('<div />', {class:'js-breakpoint', css:{'display': 'none'}});
  $ref.appendTo($('body'));

  querryJSONString = $ref.css('content');

  querries = parseJSONString(querryJSONString);

  mediaQuery = {
    onEnter: function (queryKey,callback,callOnRegister) {
      addEvent( 'enter',queryKey,callback,callOnRegister );
    },
    onLeave: function (queryKey,callback,callOnRegister) {
      addEvent( 'leave',queryKey,callback,callOnRegister );
    },
    is: function (queryKey) {
      return match(queryKey);
    },
    isNot: function (queryKey) {
      return !match(queryKey);
    }
  };

  return mediaQuery;
});
