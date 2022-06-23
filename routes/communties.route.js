const { Router } = require("express");
const { communityController } = require("../controllers/community.controller");

const router = Router();

router.post("/", communityController.postCommunity);
router.get("/", communityController.getCommunity);
router.get("/:id", communityController.getCommunityById);
router.patch("/members/:id", communityController.addMember);
router.patch("/rating/:id", communityController.addFounder);
router.delete("/:id", communityController.deleteCommunity);
router.patch("/emblem/:id", communityController.editAvatar);

module.exports = router;
