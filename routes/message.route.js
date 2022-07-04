const Router = require("express");
const { messageController } = require("../controllers/messages.controller");


const router = Router();

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessage);


module.exports = router;
