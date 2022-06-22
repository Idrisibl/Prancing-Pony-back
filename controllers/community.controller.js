const Discussion = require("../models/Discussion.model");

module.exports.communityController = {
  postDiscussion: async (req, res) => {
    try {
      const { name, user, answers, watched, text } = req.body;
      const createF = await Discussion.create({
        name,
        user,
        answers,
        watched,
        text,
      });
      res.json(createF);
    } catch (err) {
      console.error({err: "Ошибка при создании обсуждения"});
    }
  },
  getDiscussion: async (req, res) => {
    try {
      const getF = await Discussion.find({});
      res.json(getF);
    } catch (err) {
      console.error({err: "Ошибка при получении обсуждений"});
    }
  },
  getDiscussionById: async (req, res) => {
    try {
      const getByF = await Discussion.findById({
        _id: req.params.discussionId,
      });
      res.json(getByF);
    } catch (err) {
      console.error({err: "Ошибка при получении обсуждения по id"});
    }
  },
  
  addAnswer: async (req, res) => {
    try {
      const discF = await Discussion.findById(req.params.discussionId);
      const addF = await Discussion.findByIdAndUpdate(discF, {
        $push: {
          answers: req.body.answers,
        },
      });
      res.json(addF);
    } catch (err) {
      console.error({err: "Ошибка при добавлении ответов"});
    }
  },
  addWatched: async(req, res)=>{
      try{
          const discF = await Discussion.findById(req.params.discussionId);
        const addF = await Discussion.findByIdAndUpdate(discF,{
            $push:{
                watched: req.body.watched
            }
        })
        res.json(addF)
      } catch(err){
          console.error({err: "Ошибка при добавлении просмотров"})
      }
  }
};