const mongoose = require('mongoose');

const fieldsSchema = mongoose.Schema({
  ceremony_id: {type: String},
  template_id: {type: String},
  fields: {type: Array}
});

module.exports = mongoose.model('fields', fieldsSchema)
