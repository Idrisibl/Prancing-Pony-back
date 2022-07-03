const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const fileMiddleware = require("../middlewares/file.middleware")

const router = Router();

router.post("/",fileMiddleware.single("image"), newsController.postNews);
router.get("/", newsController.getAllNews);
router.get("/community/:id", newsController.getNewsByCommunity);
router.patch("/likes/:id",authMiddleware, newsController.addLike);
router.patch("/likes/remove/:id", authMiddleware, newsController.deleteLike);
router.patch("/dislikes/:id", authMiddleware, newsController.addDislike);
router.patch("/dislikes/remove/:id",authMiddleware, newsController.delDislike);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
