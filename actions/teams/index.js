module.exports = (app) => {
  const Team = app.models.Team;
  const Project = app.models.Project;

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next){

    Team.findOne({
      name: req.body.name
    })
        .then(app.utils.ensureEmpty)
        .catch(app.utils.reject(403, 'Team.name.already.exists'))
        .then(ensureProjectExist)
        .then(createTeam)
        .then(res.commit)
        .catch(res.error)

        function ensureProjectExist(){
          return Project.findById(req.body.projectId)
                 .then(app.utils.ensureOne)
                 .then(ensureProjectEmpty)
                 .catch(app.utils.reject(403, 'Project.not.foundenculeee'))

          function ensureProjectEmpty(project){
            if (!project.team) {
              console.log("je passe laaa ");
              return project;
            }
            console.log("je passe la ");

            return app.utils.reject(403, 'Project.have.already.team')
          }
        }

        function createTeam(){
          let team = new Team(req.body);

          team.users.push({id:req.userId, role:'Owner'})
          return team.save();
        }
  }

  function list(req, res, next) {
    Team.find()
      .then(res.commit)
      .catch(res.error)
  }

  function show(req, res, next) {
    Team.findById(req.params.id)
      .populate('users')
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'team.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function update(req, res, next){
    Team.findByIdAndUpdate(req.body.id, req.body)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'team.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  // ne pas oublier de remove la team dans le model User
  function remove(req, res, next){
    Team.findByIdAndRemove(req.params.id)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'Team.not.found'))
      .then(app.utils.empty)
      .then(res.commit)
      .catch(res.error)
  }
}
