import mongoose from 'mongoose';
import validator from 'validator';

const user = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

module.exports = mongoose.model('User', user);
