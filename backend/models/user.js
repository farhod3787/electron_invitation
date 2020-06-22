const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
  login: {type: String},
  password: {type: String},
  name: {type: String},
  logo: {type: String}
});

userSchema.statics.verifyUser = function(users, body) {
  var object = {isUser : false};
  var distoken = undefined;

  users.forEach((user) => {
          distoken = jwt.verify(user.password, 'pro');
          console.log(distoken);

      if (distoken) {
          if(user.login == body.login && distoken.password == body.password ) {
                  object.isuser = true;
                  object.userId = user._id;
                  object.token = jwt.sign({login: user.login, password: user.password}, 'pro')
          }
      }
      else {
          console.log("Distoken Undefined")
      }
  })
  return object;
}

module.exports = mongoose.model('user', userSchema)
