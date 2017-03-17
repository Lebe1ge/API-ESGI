const timestamp = require('mongoose-timestamp');
module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const ProjectSchema = new Schema({
    name: {
      type: String,
      required: 'true'
    },
    creator : {
      type: app.mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    tasks: [
       {
         type: app.mongoose.Schema.Types.ObjectId,
         ref:'Task'
       }
    ],
    team :
     {
       type: app.mongoose.Schema.Types.ObjectId,
       ref: 'Team'
     }

  });

  ProjectSchema.plugin(timestamp);
  return app.mongoose.model('Project', ProjectSchema);
}
