const express = require('express');
const router = express.Router();
const admin = require('./admin/admin');
const category = require('./category/category');

router.use('/admin', admin);
router.use('/category', category);

module.exports = router;