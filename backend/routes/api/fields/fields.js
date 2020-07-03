const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller');
 

router.post('/', Controllers.fields.createFileds);
router.get('/:ceremony_id/:template_id', Controllers.fields.getFields);
router.delete('/:id', Controllers.fields.deleteFields);

module.exports = router;