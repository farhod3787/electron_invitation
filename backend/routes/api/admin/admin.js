const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller');

router.post('/', Controllers.admin.createAdmin);
router.post('/login', Controllers.admin.login);


module.exports = router;
