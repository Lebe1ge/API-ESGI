module.exports = (app) => {
    const User = app.models.User;
    const Team = app.models.Team;

    return (req, res, next) => {
        let newAssignedUser = null;
        let team = null;

        return findAssigned()
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'assigned.not.found'))
            .then(findTeam)
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'team.not.found'))
            .then(updateTeam)
            .then(updateAssigned)
            .then(app.utils.empty)
            .then(res.commit)
            .catch(res.error);

        function findAssigned(){
            return User.findById(req.body.assignedId)
                .then(set);

            function set(data){
                return newAssignedUser = data;
            }
        }

        function findTeam(){
            return Team.findById(req.params.id)
                .then(set);

            function set(data){
                return team = data
            }
        }

        function updateTeam() {
            team.users.push(newAssignedUser._id.toString());
            return team.save();
        }

        function updateAssigned(){
            newAssignedUser.teams.push(team._id.toString());
            return newAssignedUser.save();
        }

        function returnTeam(){
            return team;
        }
    };
};