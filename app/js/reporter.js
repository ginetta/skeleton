define(['jquery', 'REPORTER_CONFIG'], function($, REPORTER_CONFIG) {
  'use strict';

  var REPO_URL = REPORTER_CONFIG.REPO;
  var URL      = REPORTER_CONFIG.URL;

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  };

  // -------------------------------------------------------------------
  // Add prototype for 'window.location.query([source])' which contain an object
  // of querystring keys and their values
  // -------------------------------------------------------------------
  if(!window.location.query) {
    window.location.query = function(source){
      var map = {};
      source = source || this.search;

      if ("" != source) {
        var groups = source.substr(1).split("&"), i;

        for (i in groups) {
          i = groups[i].split("=");
          map[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
      }

      return map;
    };
  }

  var isReportingIssue = false;

  function insertFeedbackPoint(x, y, viewportWidth, viewportHeight) {
    isReportingIssue = true;
    var html = '';
    html += '<div class="feedback">';
    html += '  <div class="feedback-point"></div>';
    html += '  <div class="feedback-info-container">';
    html += '      <form method="post" action="#" class="feedback-form">';
    html += '        <div class="feedback-field">';
    html += '          <label class="feedback-label">Title:</label>';
    html += '          <input type="text" name="title" placeholder="e.g. [FEATURE] Add Favicons">';
    html += '        </div>';
    html += '        <div class="feedback-field">';
    html += '          <label class="feedback-label">Description:</label>';
    html += '          <textarea name="description" rows="4" cols="50" placeholder="- [ ] favicon.ico 16x16"></textarea>';
    html += '        </div>';
    html += '        <input type="hidden" name="width" value="' + viewportWidth + '">';
    html += '        <input type="hidden" name="height" value="' + viewportHeight + '">';
    html += '        <input type="hidden" name="x" value="' + x + '">';
    html += '        <input type="hidden" name="y" value="' + y + '">';
    html += '        <input type="submit" class="feedback-submit" value="Submit Issue" />';
    html += '        <a href="#" class="feedback-cancel">Cancel</a>';
    html += '      </form>';
    html += '  </div>';
    html += '</div>';

    var sheet = window.document.styleSheets[0];
    var css = '';
    css += '.feedback {';
    css += '  z-index: 9999;';
    css += '  position: absolute;';
    css += '  top: ' + y + 'px;';
    css += '  left: ' + x + 'px;';
    css += '  font-size: 14px;';
    css += '  Helvetica, Arial, sans-serif;';
    css += '} ';
    sheet.insertRule(css, sheet.cssRules.length);

    css =  '.feedback-info-container {'
    css += '  width: 400px;'
    css += '  background: white;'
    // css += '  border: 1px solid black;'
    css += '  border-radius: 3px;'
    css += '  padding: 15px;'
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback-point {';
    css += '  background: red;';
    css += '  border-radius: 100%;';
    css += '  width: 40px;';
    css += '  height: 40px;';
    css += '  transform: translate(-50%, -50%);';
    css += '} ';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback-field { margin: 10px 0; }';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback-label, .feedback input, .feedback textarea {'
    css += '  display: block;';
    css += '  width: 100%;';
    css += '  padding: 5px;';
    css += '  border: 0;';
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback input {';
    css += '  border-bottom: 1px solid #ccc;';
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback input:focus {';
    css += '  outline: none;';
    css += '  border-color: #000;'
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback textarea {';
    css += '  border-left: 1px solid #ccc;';
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback textarea:focus {';
    css += '  outline: none;';
    css += '  border-color: #000;'
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);


    css = '.feedback-submit {';
    css += '  width: 100%;';
    css += '  padding: 10px 0;';
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);

    css = '.feedback-cancel {';
    css += '  width: 100%;';
    css += '  padding: 10px 0;';
    css += '}';
    sheet.insertRule(css, sheet.cssRules.length);


    $('body').append(html);
    $('.feedback').on('click', '.feedback-cancel', cancelIssueReport);
    $('.feedback').on('submit', '.feedback-form', submitIssue)
  }

  function cancelIssueReport (event) {
    $('.feedback').remove();
    isReportingIssue = false;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function submitIssue (event) {
    var issueDataObject = $(this).serializeObject();
    var issueDataQuery  = $(this).serialize();
    $.ajax({
      url: 'http://protected-sands-2776.herokuapp.com/',
      type: 'POST',
      crossDomain: true,
      contentType: 'application/json',
      data: JSON.stringify({
        url: REPO_URL,
        title: issueDataObject.title,
        body: issueDataObject.description + '\n\n\n Reproduce: ' + URL + '/en/?' + issueDataQuery + '&feedback=true'
      }),
      dataType: 'text',
      success: function(result) {
        cancelIssueReport();
      },
      error: function(error) {
        console.error('Failed to connect', error);
      }
    });
    event.preventDefault();
    return false;
  }

  function feedback_handler (event) {
    if (!isReportingIssue) {
      var x = event.pageX;
      var y = event.pageY;
      var viewportWidth = document.body.clientWidth;
      var viewportHeight = document.body.clientHeight;
      insertFeedbackPoint(x, y, viewportWidth, viewportHeight);
    }
  }

  function verifyFeedbackOnUrl () {
    var queryParams = window.location.query();
    if (queryParams.feedback) {
      $('html').width(queryParams.width);
      insertFeedbackPoint(queryParams.x, queryParams.y, queryParams.width, queryParams.height);
    }
  }
  $(document).ready(verifyFeedbackOnUrl);
  $(document).on('click', feedback_handler);
});
