const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
  name: String,
  emblem: {
    type: String,
    default: "tavern.png",
  },
  description: String,
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  requests: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  founder: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
