var express = require('express');
var router = express.Router();

let hobbiesController = require('../controllers/hobby')

router.get('/',hobbiesController.showHobbies);
router.post('/',hobbiesController.createHobby);
router.delete('/:id',hobbiesController.deleteHobby)
router.put('/:id',hobbiesController.editHobby)
module.exports = router;