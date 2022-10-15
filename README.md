# express-permission

[![NPM Version](https://img.shields.io/npm/v/express-permission.svg)](https://www.npmjs.com/package/express-permission)
[![Build Status](https://img.shields.io/github/workflow/status/alxhotel/express-permission/ci/master)](https://github.com/alxhotel/express-permission/actions)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/express-permission)](https://libraries.io/npm/express-permission)
[![Standard - Javascript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Permission based on roles for Express.

## Install

```sh
npm install express-permission
```

## Usage

1. Set permission in the express app:

```js
app.set('permission', { role: 'userProperty' })

app.set('permission', { role: ['my', 'nested', 'property'] })
```

2. Set the permission in the router:

```js
const expressPermission = require('express-permission')

router.get('/', expressPermission(), function(req, res) {
  // Do some logic here
})

router.get('/', expressPermission(['admin', 'user', 'superadmin']), function(req, res) {
  // Do some logic here
})

```

## License

MIT. Copyright (c) [Alex](https://github.com/alxhotel)

## Acknowledgement

This package is a fork from [permission](https://github.com/tenodi/permission)
