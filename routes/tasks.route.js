const { Router } = require("express");
const { taskController } = require("../controllers/tasks.controller");

const router = Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.get("/categories/:id",taskController.getTasksOnCategories);
router.delete("/:id",taskController.delTask);
router.patch("/task/:id",taskController.patchTask);


module.exports = router;
