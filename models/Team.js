const timestamp = require('mongoose-timestamp');

module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const TeamSchema = new Schema({
    users: [
       {
         type: app.mongoose.Schema.Types.ObjectId,
         ref: 'User'
       }
    ],
    project: {
      type: app.mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    owner: {
      type: app.mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  });

  TeamSchema.plugin(timestamp);

  return app.mongoose.model('Team', TeamSchema);

}
