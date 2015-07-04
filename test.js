'use strict';
var assert = require('assert');
var linktack = require('./');
var _ = require('lodash');

it('should ', function () {
  var html = [
    '<html>',
    '<head>',
    '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic">',
    '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Inconsolata:400,700">',
    '</head>',
    '</html>'
  ].join('\n');

  var tack = linktack(html, function (href, attr) {
    return href + '/newaddr';
  })

  assert(tack.links.length === 2);
  assert(/newaddr/.test(tack.destHTML), 'Updated href value should be existed');
});
