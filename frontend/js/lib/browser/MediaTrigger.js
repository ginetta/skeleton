/*
    Usage:

    var mediaTrigger = new MediaTrigger( $('.js-breakpoint').css('content') );

    mediaTrigger.init();

    mediaTrigger.on('mobile tablet', function(querry){
      console.log(querry);
    });

    mediaTrigger.on('desktop', function(querry){
      console.log(querry);
    });

    mediaTrigger( $('.js-breakpoint').css('content') );

    mediaTrigger.onEnter('mobile tablet', function(querry){
      console.log(querry);
    },true);

    mediaTrigger.onLeave('mobile', function(querry){
      console.log(querry);
    },true);
*/

define(['jquery'],function($){
  'use strict';

  //  todo:
  //    debounce
  //    only call when change of query
  //    does not need to be a singleton

  // main function
  var mediaTrigger,
  // misc
      querryJSONString, querries, events, currentMatches, $ref,
  // helpers
      parseJSONString, addEvent, match;

  querries = {};
  events = {
    'enter': {},
    'leave': {}
  };


  currentMatches = [];

  parseJSONString = function( querryJSONString ){
    return $.parseJSON( querryJSONString.substring(1, querryJSONString.length-1) );
  };

  match = function(type, callback){
    var eventsTyped, wasCalled = [];

    eventsTyped = type ? events[type] : $.extend({},events['enter'],events['leave']);

    $.each(eventsTyped, function(key,callbacks){
      if(key in querries){
        if ( window.matchMedia( querries[key] ).matches ){

          currentMatches.push( key );

          $.each(callbacks, function(){
            if(callback && callback !== this) {
              return;
            }

            if ($.inArray(this,wasCalled) !== -1){
              return;
            }

            this(key);

            wasCalled.push(this);
          });
        }
      }
    });
  };

  addEvent = function( type,triggerString,callback,callOnAdd ){
    var i, triggers, trigger, eventsTyped;

    triggers = triggerString.split(" ");
    eventsTyped = events[type];

    for (i = 0; i < triggers.length; ++i ){
      trigger = triggers[i];
      if( !(trigger in eventsTyped) ) {
        eventsTyped[trigger] = [];
      }
      eventsTyped[trigger].push(callback);
    }

    if( callOnAdd ) {
      match(type, callback);
    }
  };

  $(window).on('resize.mediaTrigger', function(){
    match();
  });

  //creationg a dom element to read the content set by the CSS
  $ref = $('<div />', {class:'js-breakpoint', css:{'display': 'none'}});
  $ref.appendTo($('body'));

  querryJSONString = $ref.css('content');
  querries = parseJSONString( querryJSONString );

  mediaTrigger = {
    onEnter: function( triggerString,callback,callOnRegister ){
      addEvent( 'enter',triggerString,callback,callOnRegister );
    },
    onLeave: function( triggerString,callback,callOnRegister ){
      addEvent( 'leave',triggerString,callback,callOnRegister );
    }
  };

  return mediaTrigger;
});
