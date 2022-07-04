const Router = require("express");
const { chatController } = require("../controllers/chat.controller");

const router = Router()

router.post("/", chatController.createChat)
router.get("/:userId", chatController.userChats)
router.get("/find/:firstId/:secondId", chatController.findChat)

module.exports = router;