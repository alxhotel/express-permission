const permission = function (roles) {
  return function (req, res, next) {
    const options = req.app.get('permission') || {}
    const role = options.role || 'role'

    const notAuthenticated = options.notAuthenticated || { status: 401, redirect: null }
    const notAuthorized = options.notAuthorized || { status: 403, redirect: null }

    const after = options.after || function (req, res, next, authorizedStatus) {
      if (authorizedStatus === permission.AUTHORIZED) {
        next()
      } else {
        const state = (authorizedStatus === permission.NOT_AUTHORIZED) ? notAuthorized : notAuthenticated

        if (state.redirect) {
          state.message && req.flash(state.flashType, state.message)
          res.redirect(state.redirect)
        } else {
          res.status(state.status).send(null)
        }
      }
    }

    let currentRole
    if (Array.isArray(role)) {
      // Access the object recursively
      currentRole = req.user
      for (const r of role) {
        if (!currentRole) break
        currentRole = currentRole[r]
      }
    } else {
      currentRole = req.user[role]
    }

    if (req.isAuthenticated() && !currentRole) {
      throw new Error("User doesn't have property named: " + role)
    }

    if (req.isAuthenticated()) {
      if (!roles || roles.indexOf(currentRole) > -1) {
        after(req, res, next, permission.AUTHORIZED)
      } else if (Object.prototype.toString.call(currentRole) === '[object Array]') {
        let perm = permission.NOT_AUTHORIZED
        for (let i = 0; i < currentRole.length; i++) {
          if (roles.indexOf(currentRole[i]) > -1) {
            perm = permission.AUTHORIZED
            break
          }
        }
        after(req, res, next, perm)
      } else {
        after(req, res, next, permission.NOT_AUTHORIZED)
      }
    } else {
      after(req, res, next, permission.NOT_AUTHENTICATED)
    }
  }
}

Object.defineProperty(permission, 'AUTHORIZED', { value: 'authorized' })
Object.defineProperty(permission, 'NOT_AUTHORIZED', { value: 'notAuthorized' })
Object.defineProperty(permission, 'NOT_AUTHENTICATED', { value: 'notAuthenticated' })

module.exports = permission
