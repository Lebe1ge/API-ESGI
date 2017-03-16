module.exports = (app) => {

  app.use('/auth', require('./auth')(app))

  app.use('/users', require('./users')(app))

}
