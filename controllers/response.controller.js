const Response = require("../models/Response.model");

module.exports.responseController = {
  addResponse: async (req, res) => {
    try {
      const { text, task } = req.body;

      const response = await Response.create({
        text,
        user: req.user.id,
        task,
      });

      const responseOne = await Response.findById(response._id).populate(
        "user task"
      );

      return res.json(responseOne);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getResponseForTask: async (req, res) => {
    try {
      const response = await Response.find({
        task: req.params.id,
      }).populate("user task");

      return res.json(response);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeResponse: async (req, res) => {
    try {
      const response = await Response.remove({ task: req.params.id });

      return res.json(response);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
