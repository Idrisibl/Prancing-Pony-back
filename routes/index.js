const { Router } = require("express");

const router = Router();

const usersRoute = require("./users.route");
const reviewsRoute = require("./reviews.route");
const tasksRoute = require("./tasks.route");
const categoryRoute = require("./categories.route");
const communityRoute = require("./communties.route");
const newsRoute = require("./news.route");
const roomsRoute = require('./rooms.route');
const messageRoute = require('./message.route');
//const chatRoute = require('./chat.route')
const chatRoute = require('./chat.route');

router.use("/users", usersRoute);
router.use("/reviews", reviewsRoute);
router.use("/tasks", tasksRoute);
router.use("/categories", categoryRoute);
router.use("/communities", communityRoute);
router.use("/news", newsRoute);
router.use("/rooms", roomsRoute)
router.use("/messages", messageRoute)
router.use("/chat", chatRoute)

module.exports = router;
