var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 

var PostsSchema = new Schema ({

    title: {
        type: String, 
        required: true
    }, 

    link: {
        type: String, 
        required: true
    }, 

    summary: {
        type: String
    },

    isSaved: {
        type: Boolean, 
        default: false
    }, 

    image: {
        type:String
    }, 

    note: [
        {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }]

})

var Posts = mongoose.model("Posts", PostsSchema); 

module.exports = Posts; 