const Category = require("../models/Category.model");

module.exports.categoryController = {
  postCategory: async (req, res) => {
    try {
      const createCategory = await Category.create({
        name: req.body.name,
      });
      res.json(createCategory);
    } catch (error) {
      res.json({ error: "Ошибка при добавлении" });
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await Category.find({});
      res.json(category);
    } catch (error) {
      res.json({ error: "Ошибка при добавлении" });
    }
  },
};
