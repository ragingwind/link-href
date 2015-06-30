'use strict';

var parser5 = require('parse5');
var got = require('got');
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

function parseLink(html) {
  var link = [];
  var parser = new parser5.SimpleApiParser({
    startTag: function(name, attrs, selfClosing) {
      if (name === 'link' && attrs) {
        var href = attrs[_.findIndex(attrs, {name: 'href'})];

        if (href && href.value.indexOf('fonts.googleapis.com') !== -1) {
          link.push(href);
        }
      }
    }
  });

  parser.parse(html);

  return link;
}

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	opts = opts || {};

	return str + ' & ' + (opts.postfix || 'rainbows');
};
