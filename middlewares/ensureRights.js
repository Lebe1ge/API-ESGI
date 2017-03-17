module.exports = (app) => {

    return (action) => {

        const User = app.models.User;
        const Project = app.models.Project;
        const Team = app.models.Team;

        return (req, res, next) => {

            if(action.typeId == "project") {

                Project.findById(req.params.id)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'project.not.found'))
                    .then(getProjectTeam)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'team.not.found'))
                    .then(getUserRole)
                    .then(isUserCan)
                    .then(next)
                    .catch(res.error);

            }else{

                Team.findById(req.params.id)
                    .then(app.utils.ensureOne)
                    .catch(app.utils.reject(404, 'team.not.found'))
                    .then(getUserRole)
                    .catch(app.utils.reject(404, 'user.not.found'))
                    .then(isUserCan)
                    .then(next)
                    .catch(res.error);
            }

            function getProjectTeam(project) {
                return Team.findById(project.team);
            }

            function getUserRole(team) {
                let userRole = null;

                team.users.forEach((user) => {
                    console.log(user.id);
                    console.log(req.userId);
                    if(user.id.toString() === req.userId.toString()) {
                        userRole = user.role;
                    }
                });

                return userRole;
            }

            function isUserCan(userRole) {

                if(!userRole){
                    return res.status(401).send('not.enough.rights');
                }

                const roles = app.settings.acl.roles;
                const restrictions = app.settings.acl.actions;

                const requiredAccessLevel = restrictions[action.action];
                let userAccessLevel = roles[userRole].level;

                if (userAccessLevel > requiredAccessLevel) {
                    return res.status(401).send('not.enough.rights');
                }
            }
        };
    };

};