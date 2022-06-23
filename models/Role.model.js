const mongoose = require("mongoose");

const roleShema = mongoose.Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
  },
});

const Role = mongoose.model("Role", roleShema);

module.exports = Role;
