const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {type: String},
  logo: {type: String}
});

module.exports = mongoose.model('category', categorySchema)
