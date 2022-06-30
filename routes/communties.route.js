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
router.patch("/members/:id", authMiddleware, communityController.addMember);
router.patch("/rating/:id", authMiddleware, communityController.addRating);
router.delete("/:id", communityController.deleteCommunity);
router.patch(
  "/emblem",
  fileMiddleware.single("emblem"),
  authMiddleware,
  communityController.editAvatar
);

module.exports = router;
