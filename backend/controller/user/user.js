const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const fs = require('fs');
const config = require('../../config/config');

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if ( error ) {
     res.status(400).send(error.details[0].message);
  } else {
        let password = req.body.password;
        let hashPassword = jwt.sign(password, 'pro'); 
        const body = req.body;
        const file = req.file;
                let user = {
                        name: body.name,
                        login: body.login,
                        password: hashPassword,
                        logo: file.filename
                }
        let newUser = new User(user);
        try {
          await newUser.save();
          let token = jwt.sign({login: newUser.login, password: newUser.password}, 'pro');
                res.send({
                    ok: true,
                    message: 'New User created',
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
      try {
    var users = await User.find();
    const body = req.body;
    users.forEach( (user) => {
      let decode = jwt.verify(user.password, 'pro');
            if(decode) {
                if (user.login == body.login && decode == body.password) {
                        let token = jwt.sign({login: user.login, password: decode}, 'pro');
                                res.send({
                                    token: token
                                });
                } else {
                    res.send({
                        ok: false,
                        message: 'User not found'
                    })
                }
            } else {
                res.send({
                    ok: false,
                    message: 'Error in decode token'
                })
            }
    })      
        } catch (error) {
                console.log(error);
                res.send({
                    ok: false,
                    message: 'Error in find Users'
                })
        }
  }


  const updateInform = async function (req, res) {
      let id = req.params.id;
      const body = req.body; 
      try {
            let upd =  await User.findByIdAndUpdate(id, {$set: body}, {new: true});
            res.send({
                ok: true,
                message: 'Document Updated'
            });
      } catch (error) {
                console.log(error);
            res.send({
                ok: false,
                message: "Error in update"
            })
      }
  }


  const getAllUsers = async function(req, res) {
      try {
            const users = await User.find();
                 res.status(200).json(users);
      } catch (error) {
          console.log(error);
                res.send({
                    ok: false,
                    message: "Error in get All Users"
                })
      }
  }

  const deleteUser = async function (req, res) {
      let id = req.params.id;
      try {
        let  person = await User.findById(id);

        fs.unlink('backend/images/' + person.logo, function (err) {
            if (err) {
            console.log(err.message);}
            else {
                console.log('File deleted!');
            }
        });
            await User.findByIdAndDelete(id);
            res.send({
                ok: true,
                message: "User deleted"
            })
          
      } catch (error) {
          
      }
  }



  function validateUser(user) {
    const userSchema = {
        login: Joi.string().required().min(3),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(3)
    }
    return Joi.validate(user, userSchema);
    }


  module.exports = {
      createUser,
      login,
      updateInform,
      getAllUsers,
      deleteUser
  }