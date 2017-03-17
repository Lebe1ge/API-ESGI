const timestamps = require('mongoose-timestamp');

module.exports = (app) => {
    const Schema = app.mongoose.Schema;

    const TaskSchema = new Schema({
        title: {
            type: String,
            required:true
        },
        // ex: 11/20/2014 04:11
        dueDate: Date,
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            require : true
        }
    });

    TaskSchema.plugin(timestamps);

    return app.mongoose.model('Task', TaskSchema);
};
