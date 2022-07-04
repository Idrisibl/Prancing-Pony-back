const Room = require("../models/Room.model");

module.exports.roomController = {
  addRoom: async (req, res) => {
    try {
      const { author, addressee } = req.body;

      const data = await Room.create({
        
      });

      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  getAllRoom: async (req, res) => {
    try {
      const data = await Room.find();

      return res.json(data);
    } catch (error) {
      return res.json({ error: "ошибка при получении комнаты" });
    }
  },
};
