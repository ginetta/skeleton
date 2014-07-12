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
      - only call event when change of query
*/

define(['jquery'],function($){
  'use strict';

  var mediaQuery,
  // vars
      querryJSONString, querries, events, currentMatches, $ref,
  // functions
      parseJSONString, addEvent, match, updateMatches, callEvents;

  // will contain all the media queries:
  // {'mobile': 'only screen and (min-width: 500px)', ...}
  querries = {};

  // callbacks for enter and leave
  events = {
    'enter': {},
    'leave': {}
  };

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

  updateMatches = function(){
    currentMatches = [];
    $.each(querries,function(queryKey){
      if ( match(queryKey) ){
        currentMatches.push(queryKey);
      }
    });
  };

  updateMatches();

  //triggers the callbacks and updates the current matches
  callEvents = function (callback) {
    var allEvents, wasCalled = [];

    updateMatches();

    allEvents = $.extend({},events.enter,events.leave);

    $.each(allEvents, function (queryKey, callbacks) {

      $.each(callbacks, function () {
        if (callback && callback !== this) {
          return;
        }

        if ($.inArray(this, wasCalled) !== -1) {
          return;
        }

        if( !callback && $.inArray(queryKey, currentMatches) !== -1 ){
          return;
        }

        if (match(queryKey) && $.inArray(queryKey, currentMatches) !== -1) {
          return;
        }

        if (!match(queryKey) && $.inArray(queryKey, currentMatches) !== -1) {
          return;
        }

        this(queryKey);

        wasCalled.push(this);
      });

    });
  };

  //adds an event to the callbacks to the events object
  addEvent = function( type,queryKey,callback,callOnAdd ){
    var i, triggers, trigger, eventsTyped;

    triggers = queryKey.split(" ");
    eventsTyped = events[type];

    for (i = 0; i < triggers.length; ++i ){
      trigger = triggers[i];
      if( !(trigger in eventsTyped) ) {
        eventsTyped[trigger] = [];
      }
      eventsTyped[trigger].push(callback);
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
