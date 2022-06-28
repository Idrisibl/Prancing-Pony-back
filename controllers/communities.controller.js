const Community = require("../models/Community.model");

module.exports.communityController = {
  postCommunity: async (req, res) => {
    try {
      const { name, emblem, description, founder } =
        req.body;
      const createF = await Community.create({
        name,
        emblem,
        description,
        founder,
      });
      res.json(createF);
    } catch (err) {
      console.error({ err: "Ошибка при создании cообщества" });
    }
  },
  getCommunity: async (req, res) => {
    try {
      const getF = await Community.find({}).populate('founder members');
      res.json(getF);
    } catch (err) {
      console.error({ err: "Ошибка при получении сообщества" });
    }
  },
  getCommunityById: async (req, res) => {
    try {
      const getByF = await Community.findById({
        _id: req.params.id,
      }).populate("founder members");
      res.json(getByF);
    } catch (err) {
      console.error({ err: "Ошибка при получении обсуждения по id" });
    }
  },

  addMember: async (req, res) => {
    try {
      const communityFind = await Community.findById(req.params.id);
      const addFunction = await Community.findByIdAndUpdate(communityFind, {
        $addToSet: {
          members: req.body.members,
        },
      });
      res.json(addFunction);
    } catch (err) {
      console.error({ err: "Ошибка при добавлении участников" });
    }
  },

  addRating: async (req, res) => {
    try {
      const communityFind = await Community.findById(req.params.id);
      const addFunction = await Community.findByIdAndUpdate(communityFind, {
        $addToSet: {
          rating: req.body.rating,
        },
      });
      res.json(addFunction);
    } catch (error) {
      console.error({ error: "Ошибка при добавлении новостей" });
    }
  },
  deleteCommunity: async(req,res)=>{
    try{
      const deleteCommunityFunction = await Community.findByIdAndRemove(req.params.id)
      res.json(deleteCommunityFunction)
    }catch(error){
      console.error({error:"Ошибка при удалении гильдии"})
    }
  },
  editAvatar: async (req, res) => {
    try {
      await Community.findByIdAndUpdate(req.params.id, {
        emblem: req.file.path,
      });
      const community = await Community.findById(req.params.id);
      return res.json(community);
    } catch (err) {
      return res.json({ error: "Ошибка при изменении аватара" });
    }
  },
};
