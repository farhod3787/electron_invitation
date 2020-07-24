const express = require('express');
const router = express.Router();

const admin = require('./admin/admin');
const ceremony = require('./ceremony/ceremony');
const user = require('./user/user');
const template = require('./template/template');
const fields = require('./fields/fields');
const invite = require('./invite/invite');
const color = require('./color/color');
const category = require('./category/category');

router.use('/admin', admin);
router.use('/ceremony', ceremony);
router.use('/user', user);
router.use('/template', template);
router.use('/fields', fields);
router.use('/invite', invite);
router.use('/color', color);
router.use('/category', category);

module.exports = router;