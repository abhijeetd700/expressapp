var express = require('express');
var router = express.Router();

let forumController = require('../controllers/forum')

router.get('/',forumController.listForums)
router.post('/',forumController.createForum);
router.get('/:id',forumController.showForum)
router.put('/:id',forumController.editForum)
router.delete('/:id',forumController.deleteForum)
module.exports = router;