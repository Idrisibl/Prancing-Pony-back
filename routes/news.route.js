const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");

const router = Router();

router.post("/", newsController.postNews);
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.patch("/likes/:id", newsController.addLike);
router.patch("/likes/remove/:id", newsController.deleteLike);
router.patch("/dislikes/:id", newsController.addDislike);
router.patch("/dislikes/remove/:id", newsController.delDislike);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
