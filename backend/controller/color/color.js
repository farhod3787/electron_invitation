const Color = require('../../models/color');
const Joi = require('joi');

const createColor = async (req, res) => {
  const { error } = validateColor(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        let color = {
          name: body.name
        };
        let newColor = new Color(color);
        try {
          await newColor.save();
          res.send({
            ok: true,
            message: 'New Color created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create Color'
          })
        }
    }
  } 

  const getColors = async function (req, res) {
      try {
        let colors = await Color.find();
        if (colors.length > 0) {
            res.status(200).json(colors);
        } else {
            res.send({
              ok: false,
              message: 'Colors not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Colors'
          })
      }
  }

  const deleteColor = async function (req, res) {
    let id = req.params.id;
    try {
      await Color.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "Color deleted"
      })
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete Color'
         }) 
    }
  }

  function validateColor(Color) {
    const ColorSchema = {
        name: Joi.string().required().min(2) 
    }
    return Joi.validate(Color, ColorSchema);
    }

    

  module.exports = {
      createColor,
      getColors,
      deleteColor
  }