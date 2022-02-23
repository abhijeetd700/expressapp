var express = require('express');
var router = express.Router();

let replyController = require('../controllers/reply')

router.get('/',replyController.getReplies);
router.post('/',replyController.createReply);
router.get('/withforum',replyController.showRepliesWithForum);
router.delete('/:id',replyController.deleteReply)
module.exports = router;