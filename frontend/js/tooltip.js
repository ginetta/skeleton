define(function(){
  var sideMargin = 70; // Minimum number of pixel between window edge and tooltip.
  var tooltipWidth = 442;
  var tooltipWidth2 = tooltipWidth / 2;
  var $window = $(window);

  // Tooltips
  var $tooltips = $(".tooltip");
  var $tooltipTrigger = $(".tooltip__trigger");

  // Add a class to tooltip when container has small icons.
  // Needed to adapt the :after pseudo element height.
  $(".tooltip__container").each(function() {
    var $this = $(this);
    if ($this.find(".icon-info--medium").length === 0) {
      $this.find(".tooltip").addClass("tooltip--small-icon");
    }
  });

  $tooltipTrigger.on("mouseover touchstart", function(e) {
    e.preventDefault();
    // Stop event bubbling so that it doesn't reach body and
    // doesn't close the tooltips (see $("body").click below).
    e.stopPropagation();

    var $this = $(this);
    var $tooltip = $this.parent().find(".tooltip");

    // Remove left, right and bottom modifiers.
    $tooltips.removeClass("tooltip--left");
    $tooltips.removeClass("tooltip--right");
    $tooltips.removeClass("tooltip--bottom");

    // Close all tooltips.
    $tooltips.removeClass("tooltip--open");
    $tooltipTrigger.removeClass("icon--active");
    $tooltipTrigger.parent().removeClass("icon--active");

    // Reposition the tooltip in case it is is too close the the viewport edges.
    var triggerPosition = $this.offset();
    var windowWidth = $window.width();

    if (triggerPosition.left - tooltipWidth2 - sideMargin < 0) {
      $tooltip.addClass("tooltip--left");
    }
    else if (triggerPosition.left + tooltipWidth2 + sideMargin > windowWidth) {
      $tooltip.addClass("tooltip--right");
    }

    // Reposition tooltip in case it is at the bottom of the window.
    var tooltipHeight = $tooltips.height();
    var windowHeight = $window.height();
    // Only move the tooltip to top if the window is big enough.
    if (windowHeight >= tooltipHeight * 2 + 100) {
      var scroll = $window.scrollTop();
      // Calculate the bottom tooltip position relative to the document.
      var tooltipBottom = triggerPosition.top + tooltipHeight + 30; // Add 30 px offset.
      if (tooltipBottom > scroll + windowHeight - sideMargin) {
        $tooltip.addClass("tooltip--bottom");
      }
    }

    // Add the tooltip--open class to the current tooltip.
    $tooltip.addClass("tooltip--open");
    $this.addClass("icon--active"); // In case the trigger is also the container.
    $this.parent().addClass("icon--active");
  });

  $tooltips.on("mouseover touchstart", function(e) {
    // Prevent event bubbling, same as above.
    e.stopPropagation();
  });

  $(document).on("mouseover touchstart", function(e) {
    // Close the tooltips if we didn't click on a tooltip or a tooltip trigger.
    $tooltips.removeClass("tooltip--open");
    $tooltipTrigger.removeClass("icon--active");
    $tooltipTrigger.parent().removeClass("icon--active");
  });
});
