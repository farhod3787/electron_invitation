const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller');
 

router.post('/', Controllers.color.createColor);
router.get('/', Controllers.color.getColors);
router.delete('/:id', Controllers.color.deleteColor);

module.exports = router;