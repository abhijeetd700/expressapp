var express = require('express')
const { contextsKey } = require('express-validator/src/base')
const { route } = require('.')
var router = express.Router()

//To create a cookie call the func res.cookie(name,value,{maxAge:})

router.get('/setcookie/:name/:value/:age',function(req,res){
    res.cookie(req.params.name,req.params.value,{maxAge:req.params.age})
    res.send(
        `Cookie with name = ${req.params.name} and value=${req.params.value} with maxage as ${req.params.age}`
    )
})

router.get('/readcookie',function(req,res){
    console.log(req.cookies)
    let cookieString = ''
    for(let cookieName in req.cookies){
        cookieString += `Name:${cookieName} and value=${req.cookies[cookieName]} <br>`
    }
    res.send(cookieString)
})

router.get('/clearcookie/:name',function(req,res){
    res.clearCookie(req.params.name)
    res.send(`Cookie with ${req.params.name} is deleted`)
})

router.get('/getsession',function(req,res){
    res.json({name:req.session.name,location:req.session.location})
})

router.get('/members',(req,res)=>{
    if(req.session.isLoggedIn){
        res.json({username:'Abhijeet',hobbies:'gaming,coding'})
    }
    else{
        res.json({msg:'you are not logged in'})
    }
})

module.exports = router