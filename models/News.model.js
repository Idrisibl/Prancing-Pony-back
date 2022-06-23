const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    
          community: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Community",
        },
            image: String,
            title: String,
            text: String,
            likes:[{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
                default: null
            }]
        
      ,
})
const News = mongoose.model("News", newsSchema);

module.exports = News;
