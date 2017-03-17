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
        .catch(app.utils.reject(403, 'Team.already.exists'))
        .then(ensureProjectExist)
        .then(createTeam)
        .then(res.commit)
        .catch(res.error)

        function ensureProjectExist(){
          return Project.findbyId(req.body.projectId)
                 .then(app.utils.ensureOne)
                 .catch(app.utils.reject(403, 'Project.not.found'))
        }

        function createTeam(){
          let team = new Team(req.body);

          team.users.push({id:userId, role:'Owner'})
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





}
