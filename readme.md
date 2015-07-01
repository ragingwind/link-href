# linktack [![Build Status](https://travis-ci.org/ragingwind/linktack.svg?branch=master)](https://travis-ci.org/ragingwind/linktack)

> Change a link href to where you want


## Install

```
$ npm install --save linktack
```


## Usage

```js
var linktack = require('linktack');

fs.createReadStream(uri).pipe(linktack(function(link) {
  // return updated url value if you want to change the href
  return link + '/changeurl';
}).pipe(exportHtml());
```

## API

### linktack(predicate)

#### predicate

To evaluate a link which could be updated or not

## License

MIT © [ragingwind](http://ragingwind.me)
