const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller');


router.post('/',  Controllers.template.createTemplate);
router.get('/', Controllers.template.getTemplates);
router.get('/:id', Controllers.template.getOneTemplate);
router.delete('/:id', Controllers.template.deleteTemplate);

module.exports = router;