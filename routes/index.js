module.exports = (app) => {
  app.use('/auth', require('./auth')(app))
  app.use('/users', require('./users')(app))
  app.use('/projects', require('./projects')(app))
}
