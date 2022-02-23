let express = require('express')
let router = express.Router()

router.get('/setsession',function(req,res){
    req.session.name = 'Zenrays.com'
    req.session.location = 'Banglore'
    res.send('Session Set')
})

router.get('/removelocation',(req,res)=>{
    delete req.session.location
    res.send('location session variable removed')
})

router.get('/destroysession',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send('unable to destroy session')
        }
        else{
            res.send('Session destroyed completely')
        }
    })
})

router.get('/login/:pass',(req,res)=>{
    if(req.params.pass == 'abc'){
        req.session.isLoggedIn = true;
        res.json({msg:'You are loggied in'})
    }
    else{
        res.json({msg:'Wrong Password'})
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send('Unable to logout')
        }
        else{
            res.send('Logout done')
        }
    })

})


module.exports = router;