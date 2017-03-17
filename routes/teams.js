const Router = require('express').Router

module.exports = (app) => {
  let router = new Router()

  router.post('/',

    app.middlewares.ensureAuthenticated,
    app.middlewares.bodyParser.json(),
    app.middlewares.ensureFields(['name', 'projectId']),
    app.actions.teams.create
  )

  router.get('/',
    app.actions.teams.list
  )

  router.get('/:id',
    app.actions.teams.show
  )

  router.put('/',
    app.middlewares.bodyParser.json(),
    app.actions.teams.update
  )

  // // on enleve un user de la team
  // router.put('/delete/:id/',
  //   app.middlewares.bodyParser.json(),
  //   app.actions.users.update
  // )
  //
  // // on ajoute un user dans la team
  // router.put('/delete/:id/',
  //   app.middlewares.bodyParser.json(),
  //   app.actions.users.update
  // )



  router.delete('/:id', app.actions.teams.remove)

  return router
}
