"use strict";

$.each($('.project-thumb'), function(index, element) {
  var width = element.clientWidth;
  $(element).height(width);
});

$(document).foundation();
