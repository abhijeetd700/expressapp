const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    name:{type:String,max:30},
    details:{type:String,max:100},
    type:{type:String,max:20}
})

module.exports = mongoose.model('Hobby',HobbySchema);