const Invite = require('../../models/invitation');
const Joi = require('joi');
const config = require('../../config/config');

const createInvite = async (req, res) => {
  const { error } = validateInvite(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        const file = req.file;
        let invite = {
          text: body.text,
          date: body.date,
          place: body.place,
          random_id: body.random_id,
          image: file.filename
        };
        let newInvite = new Invite(invite);
        try {
          await newInvite.save();
          res.send({
            ok: true,
            message: 'New Invite created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create Invite'
          })
        }
  }
  } 

  const getOneInvite = async function (req, res) {
        let id = req.params.random_id; 
    try {
        let invite = await Invite.find({random_id: id});
        if (invite.length > 0) {
            invite[0].image = config.URL + '/images/' + invite[0].image
            res.status(200).json(invite[0]);
        } else {
            res.send({
              ok: false,
              message: 'Invite not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Invite'
          })
      }
  }


  const deleteInvite = async function (req, res) {
    let id = req.params.id;
    try {
      let  invite = await Invite.findById(id);

      fs.unlink('backend/images/' + invite.image, function (err) {
          if (err) {
          console.log(err.message);}
          else {
              console.log('File deleted!');
          }
      });
      await Invite.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "Invite deleted"
      })
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete Invite'
         }) 
    }
  }

  function validateInvite(invite) {
    const inviteSchema = {
        text: Joi.string().required().min(3), 
        date: Joi.string().required().min(3), 
        place: Joi.string().required().min(3), 
        random_id: Joi.string().required().min(3) 
    }
    return Joi.validate(invite, inviteSchema);
    }

    

  module.exports = {
      createInvite,
      getOneInvite,
      deleteInvite
    }