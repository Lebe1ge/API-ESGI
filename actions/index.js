module.exports = (app) => {
  app.actions = {
    users: require('./users')(app),
    auth: require('./auth')(app),
    projects: require('./projects')(app),
    tasks: require('./tasks')(app),
    teams: require('./teams')(app)
  }
};
