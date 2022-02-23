const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
    title:{type:String,max:100,min:10},
    doc:{type:Date},
    forumbody:{type:String,max:500,min:50},
    author:{type:String,max:50,min:5}
})

module.exports = mongoose.model('Forum',ForumSchema);