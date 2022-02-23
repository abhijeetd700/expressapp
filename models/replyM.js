const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    title:{type:String,max:50,min:10},
    doc:{type:Date},
    replybody:{type:String,max:500,min:50},
    author:{type:String,max:50,min:5},
    forumId:{type:mongoose.Schema.ObjectId,ref:"Forum",required:true}
})

module.exports = mongoose.model('ReplyM',ReplySchema);