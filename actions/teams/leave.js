module.exports = (app) => {
    const User = app.models.User;
    const Team = app.models.Team;
    const Task = 

    return (req, res, next) => {
        let originalAssignedUser = null;
        let newAssignedUser = null;
        let task = null;

        //Check if user from team

        return findAssigned()
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'assigned.not.found'))
            .then(findTask)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'task.not.found'))
            .then(getOriginalAssigned)
            .then(updateTask)
            .then(updateAssigned)
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);

        function findAssigned(){
            console.log(req.body);
            return User.findById(req.body.assignedId)
                .then(set);

            function set(data){
                return newAssignedUser = data;
            }
        }

        function findTask(){
            console.log(req.params);
            return Task.findById(req.params.task_id)
                .then(set);

            function set(data){
                return task = data
            }
        }

        function getOriginalAssigned() {
            return User.findById(task.assigned)
                .then(set);

            function set(data) {
                originalAssignedUser = data
            }
        }

        function updateTask() {
            task.assigned = req.body.assignedId;
            return task.save();
        }

        function updateAssigned(){

            return updateOriginal()
                .then(updateNew);

            function updateOriginal() {
                return User.findByIdAndUpdate(originalAssignedUser._id, {
                    $pull: {
                        'tasks': task._id
                    }
                })
            }

            function updateNew() {
                newAssignedUser.tasks.push(task._id.toString());
                return newAssignedUser.save();
            }
        }

        function returnTask(){
            return task;
        }
    };
};
