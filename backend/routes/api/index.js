const express = require('express');
const router = express.Router();
const admin = require('./admin/admin');
const category = require('./category/category');
const user = require('./user/user');

router.use('/admin', admin);
router.use('/category', category);
router.use('/user', user);

module.exports = router;