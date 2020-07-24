const Ceremony = require('../../models/ceremony');
const Joi = require('joi');
const config = require('../../config/config');

const createCeremony = async (req, res) => {
  const { error } = validateCeremony(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        const file = req.file;
        let ceremony = {
          name: body.name,
          category_id: body.category_id,
          color_id: body.color_id,
          logo: file.filename
        };
        let newCeremony = new Ceremony(ceremony);
        try {
          await newCeremony.save();
          res.send({
            ok: true,
            message: 'New Ceremony created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create Ceremony'
          })
        }
  }
  } 

  const getCeremonies = async function (req, res) {
      try {
        let ceremonies = await Ceremony.find();
        if (ceremonies.length > 0) {
            res.status(200).json(ceremonies);
        } else {
            res.send({
              ok: false,
              message: 'Ceremonies not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Ceremonies'
          })
      }
  }

  const getOneCeremony = async function (req, res) {
    let id = req.params.id;
    try {
      let ceremony = await Ceremony.findById(id);
      res.status(200).json(ceremony);
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in get One Ceremony'
         }) 
    }
  }


  const getFilterByCategory = async function(req, res) {
    let id = req.params.category_id;
    try {
      let ceremonies = await Ceremony.find({category_id: id});
      res.status(200).json(ceremonies);
    } catch (error) {
      console.log(error);
      res.send({
        ok: false,
        message: "Error in getFilterByCategory function"
      })
    }
  }

  const getFilterByColor = async function(req, res) {
    let id = req.params.color_id;
    try {
      let ceremonies = await Ceremony.find({color_id: id});
      res.status(200).json(ceremonies);
    } catch (error) {
      console.log(error);
      res.send({
        ok: false,
        message: "Error in getFilterByColor function"
      })
    }
  }

  const getFilterMixed = async function(req, res) {
    let color_id = req.params.color_id;
    let ceremony_id = req.params.ceremony_id;
    try {
      let ceremonies = await Ceremony
      .find({ "color_id": color_id , "ceremony_id": ceremony_id });
      res.status(200).json(ceremonies);
    } catch (error) {
      console.log(error);
      res.send({
        ok: false,
        message: "Error in getFilterByColor function"
      })
    }
  }

  const deleteCeremony = async function (req, res) {
    let id = req.params.id;
    try {
      let  ceremony = await Ceremony.findById(id);

      fs.unlink('backend/images/' + ceremony.logo, function (err) {
          if (err) {
          console.log(err.message);}
          else {
              console.log('File deleted!');
          }
      });
      await Category.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "Ceremony deleted"
      })
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete Ceremony'
         }) 
    }
  }

  function validateCeremony(ceremony) {
    const ceremonySchema = {
        name: Joi.string().required().min(3),
        category_id: Joi.string().required().min(5), 
        color_id: Joi.string().required().min(5) 
    }
    return Joi.validate(ceremony, ceremonySchema);
    }

    

  module.exports = {
      createCeremony,
      getCeremonies,
      getOneCeremony,
      getFilterByCategory,
      getFilterByColor,
      getFilterMixed,
      deleteCeremony
  }