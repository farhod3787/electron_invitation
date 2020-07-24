const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: {type: String}
});

module.exports = mongoose.model('color', colorSchema)
