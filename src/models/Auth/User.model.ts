import { Schema, model } from 'mongoose';

const UsersSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    otp: {
      type: String
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

UsersSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text'
});

const UsersModel = model('User', UsersSchema);

UsersModel.on('index', error => {
  if (error) {
    throw new Error(error.message);
  }
});
UsersModel.syncIndexes();

export default UsersModel;
