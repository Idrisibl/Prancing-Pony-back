const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  avatar: {
    type: String,
    default: "public\\user.png",
  },
  name: {
    type: String,
    unique: true,
  },
  lastname: String,
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
  rating: [],
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
  reviews: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      replyUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      grade: Number,
    },
  ],
  roles: [
    {
      type: String,
      ref: "Role",
    },
  ],
});

const User = mongoose.model("User", userShema);

module.exports = User;
