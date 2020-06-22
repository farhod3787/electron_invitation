const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('../../config/config');

const createAdmin = async (req, res) => {
  const { error } = validateAdmin(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        let password = req.body.password;
        let hashPassword = jwt.sign(password, 'pro'); 
        const body = req.body;
        let admin = {
          name: body.name,
          login: body.login,
          password: hashPassword
        }
        let newAdmin = new Admin(admin);
        try {
          await newAdmin.save();
          let token = jwt.sign({login: newAdmin.login, password: newAdmin.password}, 'pro');
          res.send({
            ok: true,
            message: 'Admin created',
            token: token
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create User'
          })
        }
  }
  }


  const login = async (req, res) => {
    var admins = await Admin.find();
    const body = req.body;
    admins.forEach( (admin) => {
      let decode = jwt.verify(admin.password, 'pro');
            if(decode) {
                if (admin.login == body.login && decode == body.password) {
                    let token = jwt.sign({login: admin.login, password: decode}, 'pro');
                  res.send({
                    token: token
                  });
                } else {
                  res.send({
                    ok: false,
                    message: 'Admin not found'
                  })
                }
            } else {
              res.send({
                ok: false,
                message: 'Error in decode token'
              })
            }
    })
  }

    verifyAdmin = async function(token) {
    const token = token;
    try {
      const admins = await Admin.find();
      admins.forEach( (admin) => {
       let distoken = jwt.verify(token, 'pro');
       let pass = jwt.verify(admin.password, 'pro');
       if ( distoken.login == admin.login && distoken.password == pass) {
            res.send({
                ok: true
                  });
            } else {
              res.send({
                ok: false
            });
            }
            })
          } catch (error) {
            res.send({
              ok: false
          });           
    } 
  }


  function validateAdmin(admin) {
    const adminSchema = {
        login: Joi.string().required().min(3),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(3)
    }
    return Joi.validate(admin, adminSchema);
    }

    

  module.exports = {
      createAdmin,
      login,
      verifyAdmin
  }