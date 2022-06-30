const Router = require("express");
const { reviewsController } = require("../controllers/reviews.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/:id", authMiddleware, reviewsController.addReview);
router.get("/", reviewsController.getAllReviews);
router.get("/users/:id", reviewsController.getReviewsForUser);
router.delete("/:id", reviewsController.removeReview);

module.exports = router;
