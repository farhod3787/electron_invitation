const mongoose = require('mongoose');

const ceremonySchema = mongoose.Schema({
  name: {type: String},
  category_id: {type: String},
  color_id: {type: String},
  logo: {type: String}
});

module.exports = mongoose.model('ceremony', ceremonySchema)
