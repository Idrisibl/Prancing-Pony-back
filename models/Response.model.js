const mongoose = require("mongoose");

const responseShema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: String,
  task: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Task",
  },
});

const Response = mongoose.model("Response", responseShema);

module.exports = Response;
