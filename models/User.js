const timestamp = require('mongoose-timestamp');
module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      default: 'unknown'
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

  UserSchema.plugin(timestamp);

  return app.mongoose.model('User', UserSchema);

}
