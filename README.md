# express-permission

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
