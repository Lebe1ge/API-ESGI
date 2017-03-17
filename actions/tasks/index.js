module.exports = (app) => {
    const Task = app.models.Task;
    const Project = app.models.Project;
    const Team = app.models.Team;
    const User = app.models.User;

    return {
        create,
        list,
        show,
        update,
        remove,
        assign: require('./assign')(app)
    };

    function create(req, res, next) {
        let user = null;
        return User.findById(req.userId)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(403, 'invalid.user'))
            .then(createTask)
            .then(setProjectCreatorAndAssign)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createTask(data) {
            user = data;
            return new Task(req.body);
        }

        function setProjectCreatorAndAssign(task) {
            task.creator = req.userId;
            task.assigned = req.userId;
            task.project = req.params.id;
            return task;
        }

        function persist(task) {
            return task.save()
                .then(returnTask);

            function returnTask() {
                return task;
            }
        }
    }

    function list(req, res, next) {
        Task.find({'project':req.params.id})
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        Task.findById(req.params.id)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'task.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {

        // Task.findById(req.body.id)
        //     .then(app.utils.ensureOne)
        //     .catch(app.utils.reject(404, 'task.not.found'))
        //     .then(getTeam)
        //     .then(app.utils.ensureOne)
        //     .catch(app.utils.reject(404, 'project.not.found'))

        Task.findByIdAndUpdate(req.body.id, req.body)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'task.not.found'))
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);

        // function getProject(task){
        //
        //   return Project.findById(task.project)
        //     .populate('team')
        //     .them(userAllowed)
        //     function userAllowed(user){
        //       User.findById(req.userId)
        //       .then(userAllowed)
        //     }
        // }



        // }

    }

    function remove(req, res, next) {
        Task.findByIdAndRemove(req.params.id)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'task.not.found'))
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};
