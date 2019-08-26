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

    notes: [
        {
        type: Schema.Types.ObjectId, 
        ref: "note"
    }]

})

var Posts = mongoose.model("Posts", PostsSchema); 

module.exports = Posts; 