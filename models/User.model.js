const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  avatar: {
    type: String,
    default: "public\\user.png",
  },
  name: String,
  lastname: String,
  info: {
    type: String,
    default: null,
  },
  tel: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  bag: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  wallet: {
    type: Number,
    default: 0,
  },
  favourites: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  finished: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  failed: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  blacklist: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  roles: [
    {
      type: String,
      ref: "Role",
    },
  ],
  responses: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      text: String,
      task: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Task",
      },
    },
  ],
  confirmation: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userShema);

module.exports = User;
