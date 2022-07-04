const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    addressee: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
  },
    
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
  },
  
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;