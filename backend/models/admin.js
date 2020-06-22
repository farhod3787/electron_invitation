const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const adminSchema = mongoose.Schema({
  login: {type: String},
  password: {type: String},
  name: {type: String}
});

adminSchema.statics.verifyAdmin = function(admins, body) {
  var object = {isAdmin : false};
  var distoken = undefined;

  users.forEach((user) => {
          distoken = jwt.verify(user.password, 'pro');
          console.log(distoken);

      if (distoken) {
          if(user.login == body.login && distoken.password == body.password ) {
                  object.isAdmin = true;
                  object.adminId = user._id;
                  object.token = jwt.sign({login: user.login, password: user.password}, 'pro')
          }
      }
      else {
          console.log("Distoken Undefined")
      }
  })
  return object;
}

module.exports = mongoose.model('admin', adminSchema)
