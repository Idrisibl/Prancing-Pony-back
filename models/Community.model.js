const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
  name: String,
  emblem: {
    type: String,
    default: "../public/tavern.png",
  },
  description: String,
  members: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
],
  founder: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  rating: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;