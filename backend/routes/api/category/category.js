const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller'); 

router.post('/', Controllers.category.createCategory);
router.get('/', Controllers.category.getCategories);
router.get('/:id', Controllers.category.getOneCategory);
router.delete('/:id', Controllers.category.deleteCategory);

module.exports = router;