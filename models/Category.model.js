const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  name: String,
});
const Categories = mongoose.model("Category", categoriesSchema);

module.exports = Categories;
