const mongoose = require("mongoose");

const reviewShema = mongoose.Schema({
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
});

const Review = mongoose.model("Review", reviewShema);

module.exports = Review;
