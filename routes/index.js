const { Router } = require("express");

const router = Router();

const usersRoute = require("./users.route");
const reviewsRoute = require("./reviews.route");
const tasksRoute = require("./tasks.route");
const categoryRoute = require("./categories.route");
const communityRoute = require("./communties.route");
const newsRoute = require("./news.route");

router.use("/users", usersRoute);
router.use("/reviews", reviewsRoute);
router.use("/tasks", tasksRoute);
router.use("/categories", categoryRoute);
router.use("/communities", communityRoute);
router.use("/news", newsRoute);

module.exports = router;
