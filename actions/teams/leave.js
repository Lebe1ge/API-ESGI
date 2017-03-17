module.exports = (app) => {
    const User = app.models.User;
    const Team = app.models.Team;
    const Task = app.models.Task;

    return (req, res, next) => {

        let userLeave = null;
        let teamLeave = null;

        //Check if user from team

        return teamToLeave()
            .then(app.utils.ensureOne)
            .catch(app.utils.reject(404, 'team.not.found'))
            .then(userToLeave)
            .catch(app.utils.reject(404, 'user.not.found'))
            .then(teamDeleteUser)
            .catch(app.utils.reject(404, 'user.not.in.this.team'))
            .then(userDeleteTeam)
            .catch(app.utils.reject(404, 'user.not.in.this.team'))
            .then(res.commit)
            .catch(res.error);



        function teamToLeave(){
            return Team.findById(req.params.id)
              .then(set)

              function set(data){
                  return teamLeave = data;
              }
        }

        function userToLeave(){
            return User.findById(req.userId)
              .then(set)

              function set(data){
                  return userLeave = data;
              }
        }

        function teamDeleteUser(){
            teamLeave.users.forEach((item) => {
                if(item == userLeave._id){
                    return Team.findByIdAndUpdate(teamLeave._id, {
                        $pull: {
                            'users': userLeave._id
                        }
                    })
                }
            });
        }

        function UserDeleteTeam(){
            userLeave.teams.forEach((item) => {
                if(item == teamLeave._id){
                    return Users.findByIdAndUpdate(userLeave._id, {
                        $pull: {
                            'teams': teamLeave._id
                        }
                    })
                }
            });
        }
    };
};
