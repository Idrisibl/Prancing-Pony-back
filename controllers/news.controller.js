const News = require("../models/News.model");

module.exports.newsController = {
  postNews: async (req, res) => {
    try {
      const { community, emblem, title, text, likes } = req.body;
      const createNews = await News.create({
        community,
        emblem,
        title,
        text,
        likes,
      });
      res.json(createNews);
    } catch (error) {
      console.error({ error: "Ошибка при создании новостей" });
    }
  },
  getAllNews: async (req, res) => {
    try {
      const getFunction = await News.find({});
      res.json(getFunction);
    } catch (error) {
      console.error({ error: "Ошибка при получении новостей" });
    }
  },
  getNewsById: async (req, res) => {
    try {
      const getNewsById = await News.findById(req.params.id);
      res.json(getNewsById)
    } catch (error) {
      console.error({ error: "Ошибка при получении новостей по id" });
    }
  },
  addLike: async (req, res) => {
    try {
        const like = await News.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.body.likes },
          });
          res.json(like)
    } catch (error) {
      console.error({ error: "Ошибка при добавлении лайков" });
    }
  },
  deleteLike: async (req, res) => {
    try {
        const likeDel = await News.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.body.likes },
          });
          res.json(likeDel)
    } catch (error) {
      console.error({ error: "Ошибка при удалении лайков" });
    }
  },
  addDislike: async (req, res) => {
    try {
      const dilike = await News.findByIdAndUpdate(req.params.id, {
        $addToSet: { dislikes: req.body.dislikes },
      });
      res.json(dilike);
    } catch (error) {
      res.json({error: 'Ошибка добавления дизлайков'});
    }
  },
  delDislike: async (req, res) => {
    try {
      const dislikeDel = await News.findByIdAndUpdate(req.params.id, {
        $pull: { dislikes: req.body.dislikes },
      });
      res.json(dislikeDel);
    } catch (error) {
      res.json({error: 'Ошибка удаления дизлайка'});
    }
  },
  deleteNews: async(req,res)=>{
    try{
      const deleteNewsFunction = await News.deleteOne(req.params.id)
      res.json(deleteNewsFunction)
    }catch(error){
      console.error({error:"Ошибка при удалении новостей"})
    }
  },
};
