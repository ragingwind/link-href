'use strict';

var dom5 = require('dom5');
var pred = dom5.predicates;

function getHref(link) {
  var href = null;

  if (link.attrs) {
    link.attrs.forEach(function(attr) {
      if (attr.name === 'href') {
        href = attr;
      }
    });
  }

  return href;
}

function linktack(predicate) {
  var Transform = require('stream').Transform;
  var parser = new Transform({objectMode: true});

  parser._transform = function (data, encoding, done) {
    var origin = data.toString('utf8');
    var doc = dom5.parse(origin);
    var links = dom5.queryAll(doc, pred.hasTagName('link'));

    if (links && predicate) {
      links.forEach(function (link) {
        var attr = getHref(link);

        if (attr) {
          var originHref = attr.value
          var newHref = predicate(originHref, attr);

          if (originHref !== newHref) {
            attr.value = newHref;
          }
        }
      });
    }

    this.push({
      origin: origin,
      update: dom5.serialize(doc),
      links: links
    });

    done();
  };

  return parser;
}

module.exports =  linktack;
