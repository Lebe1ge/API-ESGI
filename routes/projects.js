const Router = require('express').Router

module.exports = (app) => {
  let router = new Router();

  router.post('/',
    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields('name'),
    app.actions.projects.create
  )

  router.get('/',
      app.actions.projects.list
  );

  router.get('/:id',
    app.middlewares.ensureAuthenticated,

    app.actions.projects.show)

  router.put('/',
    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.actions.projects.update
  )

  router.delete('/:id',
    app.middlewares.ensureAuthenticated,
    app.actions.projects.remove
  )

  return router;
}
