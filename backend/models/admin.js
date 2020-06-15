const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  login: {type: String},
  password: {type: String},
  name: {type: String}
});


module.exports = mongoose.model('admin', adminSchema)
