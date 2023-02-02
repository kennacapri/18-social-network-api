const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // used mongoose matching validation for email match
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// virtual that retrieves the length of the users friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
