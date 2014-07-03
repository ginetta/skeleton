define(['globals', 'animationFrame'], function(globals){
    var lastScrollY     = 0,
    ticking             = false,
    Scroll, callbacks = {};


    /**
     * Callback for our scroll event - just
     * keeps track of the last scroll value
     */
    function onScroll() {
        lastScrollY = window.scrollY || 1;
        requestTick();
    }

    /**
     * Calls rAF if it's not already
     * been done already
     */
    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    /**
     * Our animation callback
     */
    function update() {
        //console.log("update");
        var scrollY             = window.scrollY || 1,
            halfWindowHeight    = window.innerHeight * 0.5;

        $.each(callbacks, function(){
            this.call(undefined, scrollY);
        });

        // allow further rAFs to be called
        ticking = false;
    }


    // only listen for scroll events
    globals.$d.on('touchmove.scroll', function(){
        update();
    });

    globals.$w.on('scroll.scroll', onScroll);

    Scroll = function(){};

    Scroll.prototype = {
        add: function(name, func) {
            callbacks[name] = func;

        },
        remove: function(name){
            delete callbacks[name];
        },
        get: function(){
            return callbacks;
        }
    };

    return Scroll;
});
