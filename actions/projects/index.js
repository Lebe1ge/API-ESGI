module.exports = (app) => {
  const Project = app.models.Project;
  const Team = app.models.Team;
  const User = app.models.User;


  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next){
    let user = null;
    let project = null;

    return User.findById(req.userId)
        .then(app.utils.ensureOne)
        .catch(app.utils.reject(403, 'invalid.user'))
        .then(createProject)
        .then(createTeam)
        .then(persist)
        .then(res.commit)
        .catch(res.error);

    function createProject(data) {
        user = data;
        return new Project(req.body);
    }

    function createTeam(data) {
        project = data;
        return new Team({project: data, users: [{id: user._id, role: 'Owner'}]})
          .save()
          .then(addTeam)

        function addTeam(team){
          user.teams.push(team._id);
          project.team = team;
          return project;
        }
    }

    function persist(project) {
        return user.save()
          .then(()=> { return project.save()})
    }
  }


  function list(req, res, next){
    Project.find()
      .then(res.commit)
      .catch(res.error)
  }

  function show(req, res, next){
    Project.findById(req.params.id)
      // .populate('tasks')
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'project.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function update(req, res, next){
    Project.findByIdAndUpdate(req.body.id, req.body)
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'project.not.found'))
      .then(res.commit)
      .catch(res.error)
  }

  function remove(req, res, next){
    Project.findByIdAndRemove(projectId)
        .then(app.utils.ensureOne)
        .catch(app.utils.reject(404, 'project.not.found'))
        .then(app.utils.empty)
        .then(res.commit)
        .catch(res.error);
  }
}
