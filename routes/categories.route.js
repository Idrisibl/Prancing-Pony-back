const Router = require("express");
const { categoryController } = require("../controllers/categories.controller");

const router = Router();

router.get("/", categoryController.getCategory);
router.post("/", categoryController.postCategory);

module.exports = router
