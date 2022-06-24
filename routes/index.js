const { Router } = require("express");

const router = Router();

const usersRoute = require("./users.route");
const reviewsRoute = require("./reviews.route");

router.use("/users", usersRoute);
router.use("/reviews", reviewsRoute);

module.exports = router;
