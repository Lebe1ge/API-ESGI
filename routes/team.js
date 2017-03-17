const Router = require('express').Router

module.exports = (app) => {
  let router = new Router()

  router.post('/',
    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['name', 'projectId']),
    app.actions.users.create
  )

  router.get('/',
    app.actions.users.list
  )

  router.get('/:id',
    app.actions.users.show
  )

  router.put('/',
    app.middlewares.bodyParser.json(),
    app.actions.users.update
  )

  router.delete('/:id', app.actions.users.remove)

  return router
}
