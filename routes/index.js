const { Router } = require("express");

const router = Router();

router.use(require("./tasks.route"));

module.exports = router;
