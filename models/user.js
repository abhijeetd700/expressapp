const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true,max:100},
    age:{type:Number,required:true},
    dob:{type:Date},
    password:{type:String,required:true},
    email:{type:String,required:true}
})

module.exports = mongoose.model('User',UserSchema);