const { Router } = require("express");
const {
  communityController,
} = require("../controllers/communities.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.post(
  "/",
  fileMiddleware.single("emblem"),
  authMiddleware,
  communityController.postCommunity
);
router.get("/", communityController.getCommunity);
router.get("/:id", communityController.getCommunityById);
router.patch("/request/:id", communityController.leaveRequest);
router.patch("/member/:id", communityController.addMember);
router.patch("/edit/community/:id", communityController.editCommunity);
router.patch("/clean/request/:id", communityController.deleteFromRequest);
router.patch("/rating/:id", communityController.addRating);
router.delete("/:id", communityController.deleteCommunity);
router.patch("/delete/user/:id",authMiddleware, communityController.deleteUser);

router.patch(
  "/emblem/:id",
  fileMiddleware.single("emblem"),
  communityController.editAvatar
);

module.exports = router;
