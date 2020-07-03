const mongoose = require('mongoose');

const ceremonySchema = mongoose.Schema({
  name: {type: String},
  logo: {type: String}
});

module.exports = mongoose.model('ceremony', ceremonySchema)
