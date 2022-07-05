const { json } = require("express");
const e = require("express");
const Community = require("../models/Community.model");
const User = require("../models/User.model");

module.exports.communityController = {
  postCommunity: async (req, res) => {
    try {
      const { name, description } = req.body;
      const createF = await Community.create({
        name,
        emblem: req.file && req.file.filename,
        description,
        founder: req.user.id,
      });
      //Дефолт фотка, эмблема всегда пустая
      res.json(createF);
    } catch (err) {
      console.error({ err: "Ошибка при создании cообщества" });
    }
  },
  getCommunity: async (req, res) => {
    try {
      const getF = await Community.find({}).populate("founder members requests");
      res.json(getF);
    } catch (err) {
      console.error({ err: "Ошибка при получении сообщества" });
    }
  },
  getCommunityById: async (req, res) => {
    try {
      const getByF = await Community.findById({
        _id: req.params.id,
      }).populate("founder members requests");
      res.json(getByF);
    } catch (err) {
      console.error({ err: "Ошибка при получении обсуждения по id" });
    }
  },

  leaveRequest: async (req, res) => {
    try {
      const addFunction = await Community.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          requests: req.body.requests,
        },
      });
      console.log(req.body.members);
      res.json(addFunction);
    } catch (err) {
      console.error({ err: "Ошибка при добавлении заявок" });
    }
  },
  addMember: async (req, res) => {
    try {
      const addFunction = await Community.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          members: req.body.members,
        },
      },
      );
      console.log(req.body.members);
      res.json(addFunction);
    } catch (err) {
      console.error({ err: "Ошибка при добавлении участников" });
    }
  },
  deleteFromRequest: async (req, res) => {
    try {
      console.log(req.body.requests);
      const addFunction = await Community.findByIdAndUpdate(req.params.id, {
        $pull: {
          requests: req.body.requests,
        },
      },
      );
      res.json(addFunction);
    } catch (err) {
      console.error({ err: "Ошибка при удалении участников из заявок" });
    }
  },

  addRating: async (req, res) => {
    try {
      // console.log(req.body.rating);
      const communityFind = await Community.findById(req.params.id);
      const addFunction = await Community.findByIdAndUpdate(communityFind, {
        rating: req.body.rating
      });
      res.json(addFunction);
    } catch (error) {
      console.error({ error: "Ошибка при добавлении новостей" });
    }
  },

  
  deleteUser: async (req, res) => {
    try {
      // console.log(req.body.rating);
      const communityFind = await Community.findById(req.params.id);
      console.log(findMember);

      const deleteFunction = await Community.findByIdAndUpdate(communityFind, {
        $pull: {
          members: req.user.id,
        },
        rating: req.user.rating - communityFind.rating
      });
      res.json(deleteFunction);
    } catch (error) {
      console.error({ error: "Ошибка при удалении участника" });
    }
  },

  deleteCommunity: async (req, res) => {
    try {
      const deleteCommunityFunction = await Community.findByIdAndRemove(
        req.params.id
      );
      res.json(deleteCommunityFunction);
    } catch (error) {
      console.error({ error: "Ошибка при удалении гильдии" });
    }
  },
  editAvatar: async (req, res) => {
    try {
      await Community.findByIdAndUpdate(req.params.id, {
        emblem: req.file.filename,
      });
      const community = await Community.findById(req.params.id);
      return res.json(community);
    } catch (err) {
      return res.json({ error: e.message });
    }
  },
  editCommunity: async (req, res) => {
    try {
      const community = await Community.findByIdAndUpdate(
        req.params.id,
        {
          description: req.body.description,
          name: req.body.name,
        },
        { new: true }
      );
      return res.json(community);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
