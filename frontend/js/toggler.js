define(function(){

  var $toggler = $(".js-toggler");
  $toggler.click(function(e) {
    e.preventDefault();
    // Prevent maximum call stack with code in microsite.js for .recap__detail-table.
    e.stopPropagation();
    var $this = $(this);
    var target = $this.data("toggle-target");

    if (target == "line-detail") {
      // Handle special case when target is 'line-detail' in grund-doctor-search.
      // In this case the toggle show the detail but also hide the main line.
      var $lines = $(".table__line-teaser, .line-detail");
      var toggleIsInDetail = false;
      var $thisLine = $this.closest(".table__line-teaser");
      if (!$thisLine.length) {
        toggleIsInDetail = true;
        $thisLine = $this.closest(".line-detail");
      }
      // Reset all table lines first.
      $lines.removeClass('line-detail--opened');
      $lines.removeClass('table__line--hidden');
      if (toggleIsInDetail === false) {
        $thisLine.next().addClass('line-detail--opened');
        $thisLine.addClass('table__line--hidden');
      }
    }
    else {
      // If there is no defined target check if we are in a table.
      // If this is the case then assume the target to toggle is next line.
      var speed = 0;
      var $target = $(target);
      var $table = $this.closest("table");
      if (!target && $table.length) {
        // Get current line.
        var $line = $this.closest("tr");
        $target = $line.next();
      }

      // Special case for list__accordion in permission page.
      if (target == '.list__accordion__detail') {
        $target = $this.closest('li').find(target);
        // Smooth transition on list__accordion.
        speed = 200;
      }
      $target.slideToggle(speed, function() {
        // Change the toggler --is-down modifier on complete since we check
        // the target visibility. Without it the result is wrong and the
        // toggler is always pointing down.
        $this.toggleClass("toggler--is-down", $target.is(":visible"));
      });
    }
  });

  // On table, you can add data-line-trigger to make the whole line
  // trigger the toggler.
  var $lineTriggers = $("[data-line-trigger]");
  $lineTriggers.each(function() {
    var $this = $(this);
    if ($this.find(".js-toggler").length) {
      $this.css("cursor", "pointer");
    }
    $this.click(function(e) {
      e.preventDefault();
      $(this).find(".js-toggler").click();
    });
    // And add a class for easier styling.
    $this.addClass("toggler__line");
  });
  // Display the toggler hover on line hover.
  $lineTriggers.hover(function(e) {
    $(this).find(".js-toggler").addClass("js-toggler--hover");
  }, function(e) {
    $(this).find(".js-toggler").removeClass("js-toggler--hover");
  });

  // FAQ: make title clickable.
  var $titleTriggers = $('.list__accordion__title');
  $titleTriggers.each(function() {
    var $this = $(this);
    var $li = $this.closest('li');
    if ($li.find(".js-toggler").length) {
      $this.css("cursor", "pointer");
    }
    $this.click(function(e) {
      e.preventDefault();
      $li.find(".js-toggler").click();
    });
  });
  // Display the toggler hover on line hover.
  $titleTriggers.hover(function(e) {
    var $li = $(this).closest('li');
    $li.find(".js-toggler").addClass("js-toggler--hover");
  }, function(e) {
    var $li = $(this).closest('li');
    $li.find(".js-toggler").removeClass("js-toggler--hover");
  });

});

