const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
  name: String,
  emblem: {
    type: String,
    default: null,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  description: String,
  price: Number,
  publicationYear: String,
  amountPages: String,
  size: String,
  coverType: String,
  left: Number,
  discount: Number,
  rating: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Review",
    },
  ],
  image: [],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;