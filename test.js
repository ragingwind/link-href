'use strict';
var assert = require('assert');
var linktack = require('./');
var _ = require('lodash');

function read(uri) {
  if (_.startsWith(uri, 'file://')) {
    return fs.createReadStream(uri);
  } else if (_.startsWith(uri, 'http')) {
    return got(uri);
  } else {
    var Readable = require('stream').Readable;
    var stream = new Readable();
    stream.push(uri);
    stream.push(null);
    return stream;
  }
}

function write(through) {
  var Writable = require('stream').Writable;
  var stream = new Writable({objectMode: true});
  stream._write = through;
  return stream;
}

it('should ', function (done) {
  var html = [
    '<html>',
    '<head>',
    '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic">',
    '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Inconsolata:400,700">',
    '</head>',
    '</html>'
].join('\n');

  read(html).pipe(linktack(function (href, attr) {
    return href + '/newaddr';
  })).pipe(write(function(data) {
    assert(/newaddr/.test(data.update), 'Updated href value should be existed');
    done();
  }));
});
