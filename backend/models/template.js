const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
  type: {type: String}
});

module.exports = mongoose.model('template', templateSchema)
