var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,subtitle:'lets leran little bit of templating'});
});

router.get('/contact',function(req,res,next){
  res.render('contact',{title:'Express',companyName:'Zenrays',address:'Banglore BTM'})
});

router.get('/about',function(req,res,next){
  res.send('<h1>In about route</h1>')
})

module.exports = router;
