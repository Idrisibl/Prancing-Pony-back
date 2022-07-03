const Task = require("../models/Task.model");
const User = require("../models/User.model");

module.exports.taskController = {
  createTask: async (req, res) => {
    const { categories, title, text, price } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.wallet >= price && user.wallet !== 0) {
        const task = await Task.create({
          categories,
          title,
          text,
          price,
          user: req.user.id,
        });
        return res.json(task);
      }
    } catch (error) {
      return res.json({ error: "Ошибка при добавлении задания" });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const task = await Task.find({ left: true }).populate("categories user");
      res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при вызове всех заданий" });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate(
        "categories user"
      );
      res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при вызове задания по id" });
    }
  },

  getTasksOnCategories: async (req, res) => {
    try {
      const task = await Task.find({
        categories: req.params.id,
        left: true,
      }).populate("categories user");
      res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при вызове заданий определенной категории" });
    }
  },

  getTasksForUser: async (req, res) => {
    try {
      const task = await Task.find({
        user: req.params.id,
      }).populate("categories user");
      res.json(task);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  delTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndRemove(req.params.id);

      const user = await User.findById(req.user.id);

      const wallet = user.wallet + task.price;

      await User.findByIdAndUpdate(
        req.user.id,
        {
          wallet,
        },
        {
          new: true,
        }
      );

      res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при удалении задания" });
    }
  },

  patchTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          text: req.body.text,
          price: req.body.price,
        },
        { new: true }
      ).populate("categories user");
      return res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при изменении задания" });
    }
  },

  changeAvailability: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          left: false,
        },
        { new: true }
      ).populate("categories user");

      return res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при изменении задания" });
    }
  },

  changeCompleted: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          completed: false,
        },
        { new: true }
      ).populate("categories user");

      return res.json(task);
    } catch (error) {
      res.json({ error: "Ошибка при изменении задания" });
    }
  },
};
