const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const { text, replyUser, grade } = req.body;

      const review = await Review.create({
        user: req.user.id,
        text,
        replyUser,
        grade,
      });

      return res.json(review);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const review = await Review.find().populate("user replyUser");

      return res.json(review);
    } catch (error) {
      return res.json({ error: "ошибка при получении отзывов" });
    }
  },

  getReviewsForUser: async (req, res) => {
    try {
      const review = await Review.find({
        replyUser: req.params.id,
      }).populate("user replyUser");

      return res.json(review);
    } catch (error) {
      return res.json({ error: "ошибка при получении отзывов" });
    }
  },

  removeReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndRemove(req.params.id);

      return res.json(review);
    } catch (error) {
      return res.json({ error: "ошибка при получении отзывов" });
    }
  },
};
