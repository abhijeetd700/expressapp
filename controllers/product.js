const {body,validationResult} = require('express-validator');

const Author = require('../models/author')

exports.indexController = function(req,res,next){
    res.send('<h1>Welcom to Product Page</h1')
}

exports.listController = function(req,res,next){
    res.send('<ul><li>Tshirt</li><li>Jeans</li></ul>')
}

exports.createAuthor = [
    body('first_name')
    .isAlphanumeric()
    .escape()
    .withMessage('First name shoulb be alpha numeric'),
    body('last_name')
    .isLength({min:3})
    .trim()
    .withMessage('Min Length to be 3')
    .isAlphanumeric()
    .withMessage('Only numbers and alphabets allowed'),
    function(req,res){
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
    const authorOb = new Author({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        dob:req.body.dob,
        dod:req.body.dod
    })                 
    authorOb.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json('Author created successfully')
        }
    })
    }
    }
]
exports.listAuthors = function(req,res){
    Author.find(function(err,authors_list){
        if(err){
            console.log(err)
        }
        else{
            console.log(authors_list)
            res.json(authors_list)
        }
    })
}
exports.showAuthor = function(req,res){
    Author.findById(req.params.id,function(err,author){
            // console.log(author)
            res.json(author)
        })
}

exports.deleteAuthor = function(req,res){
    console.log('Delete Func ran')
    Author.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:1,
                msg:'Successfully delete author with id'+req.params.id
            })
        }
    })
}

exports.getTodos = function(req,res){
    res.json(["Brew Coffee", "Take a walk", "Start coding"]);
}
