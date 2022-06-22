const { Router } = require("express");
const { categoryController } = require("../controllers/Categories.controller");

const router = Router();

router.get("/", categoryController.getCategory);
router.post("/", categoryController.postCategory);