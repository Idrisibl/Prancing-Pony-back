const { Router } = require("express");
const { responseController } = require("../controllers/response.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleware, responseController.addResponse);
router.get("/task/:id", responseController.getResponseForTask);
router.delete("/task/:id", responseController.removeResponse);

module.exports = router;
