const mongoose = require("mongoose");

const taskShema = mongoose.Schema({
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  title: String,
  text: String,
  price: Number,
  completed: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskShema);

module.exports = Task;
