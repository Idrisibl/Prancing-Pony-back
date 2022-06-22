const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  name: String,
});
const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
