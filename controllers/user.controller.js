const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Role = require("../models/Role.model");
const Task = require("../models/Task.model");

module.exports.userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).populate(
        "bag favourites finished friends blacklist rating responses confirmation"
      );
      return res.json(users);
    } catch (error) {
      res.status(400).json({
        error: `Ошибка вывода всех пользователей  ${error.toString()}`,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate(
        "bag favourites finished friends blacklist rating responses confirmation"
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({
        error: `Ошибка вывода определенного пользователя  ${error.toString()}`,
      });
    }
  },

  getAuthUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate(
        "bag favourites finished friends blacklist rating responses confirmation"
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({
        error: `Ошибка вывода авторизованного пользователя  ${error.toString()}`,
      });
    }
  },

  postInfo: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          info: req.body.info,
        },
        {
          new: true,
        }
      );

      return res.json(user);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { password, name, lastname, email, tel } = req.body;
      const userRole = await Role.findOne({ value: "USER" });

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      if (!hash) {
        return res.status(400).json({ error: "Invalid hash" });
      }

      const user = await User.create({
        password: hash,
        name,
        lastname,
        tel,
        email,
        roles: [userRole.value],
      });

      return res.json(user);
    } catch (error) {
      res.status(400).json({
        error: `Ошибка при регистрации пользователя  ${error.toString()}`,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.status(401).json({
          error: "Неверный логин",
        });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({
          error: "Неверный пароль",
        });
      }
      const payload = {
        id: candidate._id,
        roles: candidate.roles,
        name: candidate.name,
        lastname: candidate.lastname,
        email: candidate.email,
        tel: candidate.tel,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      if (!token)
        res.status(400).json({ error: "Ошибка при получении токена" });

      return res.json({
        token,
        id: payload.id,
        name: candidate.name,
        avatar: candidate.avatar,
      });
    } catch (error) {
      res.status(400).json({
        error: `Ошибка при авторизации  ${error.toString()}`,
      });
    }
  },

  editAvatar: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        avatar: req.file.path,
      });
      const user = await User.findById(req.user.id);
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          tel: req.body.tel,
        },
        { new: true }
      );
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  fillTheBag: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          bag: req.body.bag,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromBag: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          bag: req.body.bag,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToFavourite: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          favourites: req.body.favourites,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromFavourite: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          favourites: req.body.favourites,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToFinished: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
      const userId = await User.findById(req.user.id);

      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          finished: req.params.taskId,
        },
        wallet: userId.wallet + task.price,
        $inc: { rating: 1 },
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToFailed: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          finished: req.params.taskId,
        },
        $inc: { rating: -2 },
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToFriends: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          friends: req.body.friends,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromFriends: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          friends: req.body.friends,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToBlacklist: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          blacklist: req.body.blacklist,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromBlacklist: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          blacklist: req.body.blacklist,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToRating: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          rating: req.body.rating,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToResponces: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          responces: req.body.responces,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromResponces: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $pull: {
          responces: req.body.responces,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addToConfirmation: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          confirmation: req.body.confirmation,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  removeFromConfirmation: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $pull: {
          confirmation: req.body.confirmation,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  addWallet: async (req, res) => {
    try {
      const userId = await User.findById(req.user.id);
      userId.wallet += req.body.wallet;

      const user = await User.findByIdAndUpdate(req.user.id, {
        wallet: userId.wallet,
      });

      res.json(user);
    } catch (error) {
      res.json({ error: "ошибка при пополнении баланса" });
    }
  },
};
