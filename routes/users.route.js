const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.patch(
  "/avatar",
  fileMiddleware.single("avatar"),
  userController.editAvatar
);
router.patch("/editUser", userController.editUser);
router.patch("/bag", userController.fillTheBag);
router.patch("/bag/remove", userController.removeFromBag);
router.patch("/favoutire", userController.addToFavourite);
router.patch("/favoutire/remove", userController.removeFromFavourite);
router.patch("/finished", userController.addToFinished);
router.patch("/friends", userController.addToFriends);
router.patch("/friends/remove", userController.removeFromFriends);
router.patch("/blacklist", userController.addToBlacklist);
router.patch("/blacklist/remove", userController.removeFromBlacklist);
router.patch("/rating/:id", userController.addToRating);
router.patch("/responces/:id", userController.addToResponces);
router.patch("/responces/remove/:id", userController.removeFromResponces);

module.exports = router;
