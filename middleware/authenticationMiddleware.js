const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header('token')

    if(!token){
        return res.status(401).json({status:0,msg:'Token not send in request'})
    }
    try{
        const decodedToken = jwt.verify(token,'secretString')
        console.log(decodedToken)
        next()
    }
    catch(error){
        res.status(500).send({message:`Token Not valid: ${console.error.toString()}`})

    }
}