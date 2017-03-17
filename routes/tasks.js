const Router = require('express').Router;

module.exports = (app) => {
    let router = new Router();

    router.post('/',
        app.middlewares.bodyParser.json(),
        app.middlewares.ensureFields('title'),
        app.actions.tasks.create
    );

    router.get('/',
        app.actions.tasks.list);

    router.get('/:id',
        app.actions.tasks.show);

    router.put('/',
        app.middlewares.bodyParser.json(),
        app.actions.tasks.update);

    router.delete('/:id',
        app.actions.tasks.remove);

    /*router.put('/:id/assign/:assignedId',
        app.actions.tasks.assign);*/

    return router;
};