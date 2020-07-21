# express-permission

Permission based on roles for Express.

## Install

```sh
npm install express-permission
```

## Usage

```js
const expressPermission = require('express-permission')

app.set('permission', { role: 'myRole' })

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
