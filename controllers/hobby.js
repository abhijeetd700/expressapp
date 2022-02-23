const Hobby = require('../models/hobby')

exports.createHobby = function(req,res){
    const hobbyOb = new Hobby({
        name:req.body.name,
        details:req.body.details,
        type:req.body.type
    })
    hobbyOb.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json('Hobby created successfully')
        }
    })
}

exports.showHobbies = function(req,res){
    Hobby.find(function(err,hobby_list){
        if(err){
            console.log(err)
        }
        else{
            res.json(hobby_list)
        }
    })
}

exports.deleteHobby = function(req,res){
    Hobby.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:1,
                msg:'Successfully deleted hobby with id'+req.params.id
            })
        }
    })
}

exports.editHobby = function(req,res){
    let updateOb = req.body;
    console.log(updateOb)
    Hobby.findByIdAndUpdate(req.params.id,updateOb,function(err){
        if(err) res.json(err.toString())
        res.json({
            status:1,
            msg:'successfully edited hobby with id'+req.params.id
        })
    })
}