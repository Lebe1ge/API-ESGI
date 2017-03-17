const timestamp = require('mongoose-timestamp');

module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const TeamSchema = new Schema({
    users: [{
      id :{
         type: app.mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      role : String
    }],
    name : {
      type: String,
      unique: true
    },
    project: {
      type: app.mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      require : true
    }
  });

  TeamSchema.plugin(timestamp);

  return app.mongoose.model('Team', TeamSchema);

}
