const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const { check } = require("express-validator");
const fileMiddleware = require("../middlewares/file.middleware");

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
router.patch("/avatar/:id", fileMiddleware.single(), userController.editAvatar);
router.patch("/editUser/:id", userController.editUser);
router.patch("/bag/:id", userController.fillTheBag);
router.patch("/bag/remove/:id", userController.removeFromBag);
router.patch("/favoutire/:id", userController.addToFavourite);
router.patch("/favoutire/remove/:id", userController.removeFromFavourite);
router.patch("/finished/:id", userController.addToFinished);
router.patch("/friends/:id", userController.addToFriends);
router.patch("/friends/remove/:id", userController.removeFromFriends);
router.patch("/blacklist/:id", userController.addToBlacklist);
router.patch("/blacklist/remove/:id", userController.removeFromBlacklist);
router.patch("/rating/:id", userController.addToRating);
router.patch("/responces/:id", userController.addToResponces);
router.patch("/responces/remove/:id", userController.removeFromResponces);

module.exports = router;
