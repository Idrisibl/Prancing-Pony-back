const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const fileMiddleware = require("../middlewares/file.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/authUser/id", authMiddleware, userController.getAuthUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.patch(
  "/avatar",
  authMiddleware,
  fileMiddleware.single("avatar"),
  userController.editAvatar
);
router.patch("/editUser", authMiddleware, userController.editUser);
router.patch("/editInfo", authMiddleware, userController.postInfo);
router.patch("/bag", userController.fillTheBag);
router.patch("/bag/remove", userController.removeFromBag);
router.patch("/favoutire", authMiddleware, userController.addToFavourite);
router.patch(
  "/favoutire/remove",
  authMiddleware,
  userController.removeFromFavourite
);
router.patch("/finished/:taskId", authMiddleware, userController.addToFinished);
router.patch("/failed", authMiddleware, userController.addToFailed);
router.patch("/friends", authMiddleware, userController.addToFriends);
router.patch(
  "/friends/remove",
  authMiddleware,
  userController.removeFromFriends
);
router.patch("/blacklist", authMiddleware, userController.addToBlacklist);
router.patch(
  "/blacklist/remove",
  authMiddleware,
  userController.removeFromBlacklist
);
router.patch("/rating/:id", userController.addToRating);
router.patch("/responces/:id", userController.addToResponces);
router.patch("/responces/remove/:id", userController.removeFromResponces);
router.patch("/confirmation/:id", userController.addToConfirmation);
router.patch("/confirmation/remove/:id", userController.removeFromConfirmation);
router.patch("/addWallet", authMiddleware, userController.addWallet);

module.exports = router;
