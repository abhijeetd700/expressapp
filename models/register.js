const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name:{type:String},
    username:{type:String},
    pic:{type:Buffer},
    password:{type:String},
    email:{type:String}
})

module.exports = mongoose.model('Register',RegisterSchema);