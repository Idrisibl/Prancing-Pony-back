const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const { check } = require("express-validator");

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/register",
  [
    check("name", "Это поле не должно быть пустым").notEmpty(),
    check("lastname", "Это поле не должно быть пустым").notEmpty(),
    check("email", "Это поле не должно быть пустым").notEmpty(),
    check("email", "Некорректный email").isEmail(),
    check("password", "Это поле не должно быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 12 символов"
    ).isLength({
      min: 5,
      max: 12,
    }),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    check("email", "Это поле не должно быть пустым").notEmpty(),
    check("email", "Некорректный email").isEmail(),
    check("password", "Это поле не должно быть пустым").notEmpty(),
  ],
  userController.login
);

module.exports = router;
