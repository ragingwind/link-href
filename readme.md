# replace-link [![Build Status](https://travis-ci.org/ragingwind/node-replace-link.svg?branch=master)](https://travis-ci.org/ragingwind/node-replace-link)

> Change a link href in html to where you want


## Install

```
$ npm install --save replace-link
```


## Usage

```js
var replaceLink = require('replace-link');
var tack = replaceLink(html, function(href, attr) {
  // return updated url value if you want to change the href
  return href + '/changeurl';
});

console.log(tack.html);
console.log(tack.link);

```

## API

### replaceLink(html, evaluate)

#### html

HTML string that includes link with google font href

#### evaluate

To evaluate a link which could be updated or not

## Return

Return updated html with link information

```
{
  html: String
  link: []
}
```

## License

MIT © [Jimmy Moon](http://ragingwind.me)
