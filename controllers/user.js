const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const {body,validationResult} = require('express-validator');
const Register = require('../models/register')

exports.createUser = [
    body('name')
    .isLength({min:3,max:100})
    .withMessage('Name should be have length between 3 to 100'),
    body('age')
    .isFloat({ min: 18, max: 120 })
    .withMessage('Age should be between 18 & 120'),
    body('email')
    .isEmail(),
    body('password')
    .isLength({min:3,max:50}),
    async function(req,res){
    

    try{
        const errors = validationResult(req)
        console.log(errors)
    
        if(!errors.isEmpty()){
            res.json({
                status:0,
                data:'Validation Failed',
                debug_data:errors.array()
            })
        }
        else{
            let encryptedPassword;
            const {name,age,dob,password,email} = req.body
            
            if(!(email && password && name && age && dob)){
                res.status(400).send("All inputs are required")
            }
            else{
                const oldUser = await User.findOne({email})

                if(oldUser){
                    res.status(400).send('User Already Exist. Please Login')
                }
                else{
                    let salt = bcrypt.genSaltSync(10)
                    encryptedPassword = bcrypt.hashSync(password,salt)

                    const userOb = new User({
                        name:req.body.name,
                        age:req.body.age,
                        dob:req.body.dob,
                        password:encryptedPassword,
                        email:req.body.email
                    })
                    userOb.save(function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.json('User created successfully')
                        }
                    })
                }
            }
        }
    }
        catch(error){
            console.log(error)
            console.log('Error in bcrypt')
        }
}
]
exports.listUsers = [
    authenticationMiddleware,
    function(req,res){
    console.log(User)
    User.find(function(err,users_list){
        if(err){
            console.log(err)
        }
        else{
            console.log(users_list)
            res.json(users_list)
        }
    })
}
]


exports.getUserDetails = function(req,res){
    User.findById(req.params.id,function(err,user){
        // console.log(author)
        res.json(user)
    })
}

exports.deleteUser = function(req,res){
    User.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:1,
                msg:'Successfully deleted user with id'+req.params.id
            })
        }
    })
}

exports.editUser = function(req,res){
    let updateOb = req.body;
    console.log(updateOb)
    User.findByIdAndUpdate(req.params.id,updateOb,function(err){
        if(err) res.json(err.toString())
        res.json({
            status:1,
            msg:'successfully edited author with id'+req.params.id
        })
    })
}

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;

    let userOb = await User.findOne({email});

    if(!userOb){
        res.status(400).json({status:0,msg:'user not found'});
    }
    const passCorrect = await bcrypt.compareSync(password,userOb.password);
    if(!passCorrect){
        res.status(400).json({
            status:0,
            msg:'user credentials are wrong'
        })
    }

    const payload = {
        user:{
            email:email
        }
    }

    jwt.sign(
        payload,
        'secretString',
        {
            expiresIn:'2h'
        },
        (err,token)=>{
            if(err) throw  err;
            res.status(200).json({
                token
            })
        }
    )
}

exports.registerUser = [
    body('name')
    .isLength({min:3,max:100})
    .withMessage('Name should be have length between 3 to 100'),
    body('email')
    .isEmail(),
    body('password')
    .isLength({min:3,max:50}),

    async function(req,res){

    try{
        const errors = validationResult(req)
        console.log(errors)
    
        if(!errors.isEmpty()){
            res.json({
                status:0,
                data:'Validation Failed',
                debug_data:errors.array()
            })
        }
        else{
            let encryptedPassword;
            const {username,name,password,email} = req.body
            const file = req.files.pic
                
                const desPath = __dirname + "/files/" + file.name;
                const oldUser = await Register.findOne({email})

                if(oldUser){
                    res.status(400).send('User Already Exist. Please Login')
                }
                else{
                    file.mv(desPath, (err) => {
                        if (err) {
                            return res.status(500).write(err);
                        }
                            return res.write({ status: "success", path: desPath });
                    })

                    let salt = bcrypt.genSaltSync(10)
                    encryptedPassword = bcrypt.hashSync(password,salt)

                    const userOb = new Register({
                        name:req.body.name,
                        password:encryptedPassword,
                        email:req.body.email,
                        username:req.body.username,
                        pic:req.files.pic.data
                    })
                    userOb.save(function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.json('User created successfully')
                        }
                    })
                }
            
        }
    }
        catch(error){
            console.log(error)
            console.log('Error in bcrypt')
        }
    }
]

exports.createMsg = async(req,res)=>{
    console.log(req)
}
// exports.registerUser = (req,res)=>{
//     if(!req.files){
//         return res.status(400).send('No Files uploaded')
//     }
//     else{
//         const file = req.files.image;
//         const path = __dirname + "/files/" + file.name;
//         file.mv(path, (err) => {
//             if (err) {
//             return res.status(500).send(err);
//             }
//             return res.send({ status: "success", path: path });
//             })
//         }
// }