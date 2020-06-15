const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('../../config/config');

const createAdmin = async (req, res) => {
  const { error } = validateAdmin(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        let admin = {
          name: body.name,
          login: body.login,
          password: body.password
        }
        let newAdmin = new Admin(admin);
        try {
          await newAdmin.save();
          res.send({
            ok: true,
            message: 'Admin created'
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


  function validateAdmin(admin) {
    const adminSchema = {
        login: Joi.string().required().min(3),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(3)
    }
    return Joi.validate(admin, adminSchema);
    }

    

  module.exports = {
      createAdmin
  }