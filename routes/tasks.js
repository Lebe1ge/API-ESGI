const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.post('/:id/tasks',
        app.middlewares.bodyParser.json(),
        app.middlewares.ensureFields('title'),
        app.actions.tasks.create
    );

    router.get('/:id/tasks',
        app.actions.tasks.list);

    router.get('/:id/tasks/:task_id',
        app.actions.tasks.show);

    router.put('/:id/tasks',
        app.middlewares.bodyParser.json(),
        app.actions.tasks.update);

    router.delete('/:id/tasks',
        app.actions.tasks.remove);

    /*router.put('/:id/assign/:assignedId',
        app.actions.tasks.assign);*/

    return router;
};