# mirrorstore: Store data into multiple backends at once

[![Build Status](https://travis-ci.org/borisceranic/mirrorstore.svg)](https://travis-ci.org/borisceranic/mirrorstore)

This module allows storage and retrieval of values across multiple backend
storage mechanisms at the same time.

Currently, it supports:

* LocalStorage

* IndexedDB

* WebSQL

* Cookies

It will use all available backends when writing.

This module uses Promises for asynchronous operation.

## Usage

Install via npm:

```bash
npm install --save mirrorstore
```

In your code:

```js
var MirrorStore = require('mirrorstore');

var ms = new MirrorStore('MyDatabase')

var opts = {
    domain: '.example.com',
    path: '/',
    expires: 60 * 60 * 24 * 7,
    secure: false,
}

// You can store any kind of data...
ms.setItem('userId', '141562716', opts)
// Objects, too!
ms.setItem('prefs', {notify: true, volume: 0.7}, opts)

// Retrieve data by key
ms.getItem('prefs').then(function(value) {
    console.log(value)
})

ms.keys().then(function(keys) {
    console.log(keys)
})

// Remove data by key
ms.removeItem('prefs', opts).then(function() {
    // removed!
})
```

## API

### `new MirrorStore([databaseName])`

Creates a new instance of MirrorStore.

If `databaseName` is set, it will be used to partition data stored into
IndexedDB and WebSQL databases. This value is also visible if browser asks
user to allow storing additional data when the backend- and browser-specific
limit is reached.

### `supports()` -> Array

Returns an array of supported backends that will be used for storage.

### `setItem(key, value, [options])` -> Boolean

Write `value` under a `key` into all available backends.

Returns `true`.

See **Options** below for more information on `options` argument.

Note: it is not possible to store `null` or `undefined` value. If such a
value is set, when fetched, it will be returned as `undefined`, as if it
weren't set at all.

### `getItem(key)` -> Mixed

Retrieve the value stored under the `key` from all available backends.

If value is available under any backend, it will be returned.

If a different value is available via different backends, the value with most
occurrences will be returned.

### `removeItem(key, [options])` -> Boolean

Return the value stored under `key` from all available backends.

See **Options** below for more information on `options` argument.

### `keys()` -> Array

Returns an array of all keys available in all storage backends.

Keys will be retrieved only from the database named during instantiation
of this class (the `databaseName` argument to constructor).

## Options

If options map is passed when invoking `setItem()` or `removeItem()` methods,
it will be passed on to a cookie backend. This is important because
a different cookie value can be visible depending on the current page
path, whether or not a page is loaded via https, etc.

### `expires` (Mixed)

When the cookie expires.

Possible values:

* `Infinity`,

* Number of seconds when to expire the cookie (e.g. `180` for 3 minutes),

* Any parseable date or time string (e.g. `2016-01-01 00:00:00`),

* An instance of `Date` class,

* *unset*: cookie will expire when the browser is closed,

**Default**: `expires` is not set.

### `domain` (String)

A `string` indicating a valid domain where the cookie should be visible.
The cookie will also be visible to all subdomains.

**Default**: Cookie is visible only to the domain or subdomain of the page
where the cookie was created, except for Internet Explorer (visible on
current domain/subdomain and all nested subdomains, too).

### `path` (String)

A path under which cookie is visible (e.g. `/admin/`)

**Default**: `/`

### `secure` (Boolean)

Either `true` or `false`, indicating if the cookie transmission requires
a secure protocol (https).

**Default**: `false`, cookie will be transferred, regardless of https.

## License

[BSD 3-Clause License](https://tldrlegal.com/l/bsd3)

Copyright (c) 2015, [Boris Ćeranić](https://sosko.in.rs)
