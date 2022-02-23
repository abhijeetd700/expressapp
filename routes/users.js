var express = require('express');
const { use } = require('express/lib/router');
var router = express.Router();

let userController = require('../controllers/user')
/* GET users listing. */
router.get('/',userController.listUsers);
router.post('/',userController.createUser)
router.post('/msg',userController.createMsg)
router.delete('/:id',userController.deleteUser)
// router.get('/:id',userController.getUserDetails)
// router.delete('/:id',userController.deleteUser)
router.put('/:id',userController.editUser)
router.post('/login',userController.loginUser)
router.post('/register',userController.registerUser)
router.get('/contact',function(req,res,next){
  res.send('<h1>In contact route inside users</h1>')
})

router.get('/about',function(req,res,next){
  res.send('<h1>In about route inside users</h1>')
})

// router.get('/createuser',userController.createUser)
// router.get('/listusers',userController.listUsers)
// router.get('/deleteuser/:id',userController.deleteUser)

module.exports = router;