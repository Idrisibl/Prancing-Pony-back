const Router = require("express");
const { roomController } = require("../controllers/rooms.controller");


const router = Router();

router.post("/", roomController.addRoom);
router.get("/", roomController.getAllRoom);


module.exports = router;
