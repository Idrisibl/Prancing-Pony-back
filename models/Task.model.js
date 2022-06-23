const mongoose = require("mongoose");

const taskShema = mongoose.Schema({
categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
},
title: String,
text: String,
price: String,
completed: {
    type: Boolean,
    default: false
},
left: {
    type: Boolean,
    default: false
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
});

const Task = mongoose.model("Task", taskShema);

module.exports = Task;