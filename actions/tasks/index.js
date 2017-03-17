module.exports = (app) => {
    const Task = app.models.Task;
    const User = app.models.User;

    return {
        create,
        list,
        show,
        update,
        remove
        //assign: require('./assign')(app)
    };

    //TODO : modifier body.userId

    function create(req, res, next) {
        let user = null;

        return User.findById(req.body.userId)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(403, 'invalid.user'))
            .then(createTask)
            .then(setCreatorAndAssign)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createTask(data) {
            user = data;
            return new Task(req.body);
        }

        function setCreatorAndAssign(todo) {
            todo.creator = req.body.userId;
            todo.assigned = req.body.userId;
            console.log(todo);
            return todo;
        }

        function persist(todo) {
            return todo.save()
                .then(addToUser)
                .then(returnTask);

            function addToUser(todo) {
                user.tasks.push(todo._id);
                user.save()
            }

            function returnTask() {
                return todo;
            }
        }
    }

    function list(req, res, next) {
        Task.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        Task.findById(req.params.id)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'todo.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Task.findByIdAndUpdate(req.body.id, req.body)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'todo.not.found'))
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Task.findByIdAndRemove(req.params.id)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'todo.not.found'))
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};

