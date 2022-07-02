const { Router } = require("express");
const { taskController } = require("../controllers/tasks.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.get("/categories/:id", taskController.getTasksOnCategories);
router.delete("/:id", authMiddleware, taskController.delTask);
router.patch("/:id", taskController.patchTask);

module.exports = router;
