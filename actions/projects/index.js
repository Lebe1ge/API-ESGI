module.exports = (app) => {
  const Project = app.models.Project;
  const User = app.models.User;


  return {
    create,
    list,
    show,
    update,
    remove,
      listTasks
  }

  function create(req, res, next){
    let user = null;

    return User.findById(req.userId)
        .then(app.utils.ensureOne)
        .catch(app.utils.reject(403, 'invalid.user'))
        .then(createProject)
        .then(setCreatorAndAssign)
        .then(persist)
        .then(res.commit)
        .catch(res.error);

    function createProject(data) {
        user = data;
        return new Project(req.body);
    }

    function setCreatorAndAssign(project) {
        project.creator = req.userId;
        return project;
    }

    function persist(project) {
        return project.save()
            .then(addToUser)
            .then(returnProject);

        function addToUser(project) {
            user.projects.push(project._id);
            user.save()
        }

        function returnProject() {
            return project;
        }
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

    function listTasks(req, res, next){
        Project.findById(req.params.id)
            .then(res.commit)
            .catch(res.error);
    }
}
