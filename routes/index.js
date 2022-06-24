const { Router } = require("express");

const router = Router();

const userRoute = require("./user.route");

router.use("/users", userRoute);

module.exports = router;
