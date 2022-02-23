var express = require('express');
var router = express.Router();

let productsController = require('../controllers/product')

router.get('/',productsController.indexController);

router.get('/list',productsController.listController)
router.post('/createauthor',productsController.createAuthor)
router.get('/listauthors',productsController.listAuthors);
router.get('/showauthor/:id',productsController.showAuthor)
// router.get('/deleteauthor/:id',productsController.deleteAuthor)
router.get('/deleteauthor/:id',productsController.deleteAuthor)
router.get('/todos',productsController.getTodos)
module.exports = router;            