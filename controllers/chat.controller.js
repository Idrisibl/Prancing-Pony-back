const ChatModel = require("../models/Chat.model");

module.exports.chatController = {
  createChat: async (req, res) => {
    try {
      const chats = await ChatModel.find({
        members: [req.body.senderId, req.body.receiverId],
      });

      if (!chats.length) {
        const newChat = ChatModel.create({
          members: [req.body.senderId, req.body.receiverId],
        }); 
        return res.status(200).json(newChat);
      }

      return res.json({ error: "already exist" });
      //   const result = await newChat.save();
    } catch (error) {
      res.status(500).json(error);
    }
  },

  userChats: async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  findChat: async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
