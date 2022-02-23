const Forum = require('../models/forum')
const {body,validationResult} = require('express-validator');

exports.createForum = [
    body('title')
    .trim()
    .isLength({min:10,max:100})
    .withMessage('Title should have length between 10 and 100'),
    body('forumbody')
    .trim()
    .escape()
    .isLength({min:50,max:500})
    .withMessage('Forum Body should be in Length 50 to 500'),
    body('author')
    .isAlphanumeric()
    .withMessage('Only numbers and alphabets allowed')
    .isLength({min:5,max:50})
    .withMessage('Author length should be between 5 and 50'),

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
    const forumOb = new Forum({
        title:req.body.title,
        doc:req.body.doc,
        forumbody:req.body.forumbody,
        author:req.body.author
    }) 
    forumOb.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json('Forum created successfully')
        }
    })
    }}
]

exports.listForums = function(req,res){
    Forum.find(function(err,forum_list){
        if(err){
            console.log(err)
        }
        else{
            res.json(forum_list)
        }
    })
}

exports.showForum = function(req,res){
    Forum.findById(req.params.id,function(err,forum){
            res.json(forum)
        })
}

exports.deleteForum = function(req,res){
    Forum.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:1,
                msg:'Successfully deleted forum with id'+req.params.id
            })
        }
    })
}

exports.editForum =[
        body('title')
        .trim()
        .isLength({min:10,max:100})
        .withMessage('Title should have length between 10 and 100'),
        body('forumbody')
        .trim()
        .escape()
        .isLength({min:50,max:500})
        .withMessage('Forum Body should be in Length 50 to 500'),
        body('author')
        .isAlphanumeric()
        .withMessage('Only numbers and alphabets allowed')
        .isLength({min:5,max:50})
        .withMessage('Author length should be between 5 and 50'),

        function(req,res){
        let updateOb = req.body;
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
            Forum.findByIdAndUpdate(req.params.id,updateOb,function(err){
                if(err) res.json(err.toString())
                res.json({
                    status:1,
                    msg:'successfully edited forum with id'+req.params.id
                })
            })
        }
    }
]
