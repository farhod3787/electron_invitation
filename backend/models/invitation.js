const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
  text: {type: String},
  date: {type: String},
  place: {type: String},
  image: {type: String},
  random_id: {type: String},
  template_id: {type: String},
  ceremony_id: {type: String}
});

module.exports = mongoose.model('invite', inviteSchema)
