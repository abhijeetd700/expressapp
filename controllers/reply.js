const Reply = require('../models/reply')
const {body,validationResult} = require('express-validator');

exports.createReply = [
    body('title')
    .trim()
    .isLength({min:10,max:100})
    .withMessage('Title should have length between 10 and 100'),
    body('replybody')
    .trim()
    .escape()
    .isLength({min:50,max:500})
    .withMessage('Reply Body should be in Length 50 to 500'),
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
    const replyOb = new Reply({
        title:req.body.title,
        doc:req.body.doc,
        replybody:req.body.replybody,
        author:req.body.author,
        forumId:req.body.forumId
    }) 
    replyOb.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json('Reply created successfully')
        }
    })
    }}
]

exports.showRepliesWithForum = function(req,res){
    Reply.find()
    .populate('forumId')
    .exec(function(err,list_repliesWithForum){
        if(err){
            res.json({status:0,debug_data:err})
        }
        else{
            res.json({status:1,data:list_repliesWithForum})
        }
    })
}
exports.getReplies = function(req,res){
    Reply.find(function(err,reply_list){
        if(err){
            console.log(err)
        }
        else{
            res.json(reply_list)
        }
    })
}

exports.deleteReply = function(req,res){
    Reply.findByIdAndDelete(req.params.id,function(err){
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