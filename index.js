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

function replaceLink(html, evaluate) {
  var doc = dom5.parse(html);
  var links = dom5.queryAll(doc, pred.hasTagName('link'));

  if (!links) {
    return null;
  }

  links.forEach(function (link) {
    var attr = getHref(link);

    if (attr && evaluate) {
      var href = evaluate(attr.value, attr);

      if (attr.value !== href) {
        attr.value = href;
      }
    }
  });

  return {
    html: dom5.serialize(doc),
    links: links
  };
}

module.exports = replaceLink;
