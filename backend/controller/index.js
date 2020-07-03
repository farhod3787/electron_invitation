const admin = require('./admin/admin');
const ceremony = require('./ceremony/ceremony')
const user = require('./user/user')
const template = require('./template/template')
const fields = require('./fields/fields');
const invite = require('./invite/invite')

module.exports = {
    admin,
    ceremony,
    user,
    template,
    fields,
    invite
}