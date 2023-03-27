const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    gender: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    is_married: {
      type: Boolean,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("userdata",userSchema);


module.exports = {
    UserModel
}