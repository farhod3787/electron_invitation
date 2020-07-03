const Template = require('../../models/template');
const Joi = require('joi');

const createTemplate = async (req, res) => {
  const { error } = validateTemplate(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        let template = {
          type: body.type
        };
        let newTemplate = new Template(template);
        try {
          await newTemplate.save();
          res.send({
            ok: true,
            message: 'New Template created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create Template'
          })
        }
    }
  } 

  const getTemplates = async function (req, res) {
      try {
        let templates = await Template.find();
        if (templates.length > 0) {
            res.status(200).json(templates);
        } else {
            res.send({
              ok: false,
              message: 'Templates not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Templates'
          })
      }
  }

  const getOneTemplate = async function (req, res) {
    let id = req.params.id;
    try {
      let template = await Template.findById(id);
      res.status(200).json(template);
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in get One Template'
         }) 
    }
  }

  const deleteTemplate = async function (req, res) {
    let id = req.params.id;
    try {
      await Template.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "Template deleted"
      })
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete Template'
         }) 
    }
  }

  function validateTemplate(template) {
    const templateSchema = {
        type: Joi.string().required().min(3) 
    }
    return Joi.validate(template, templateSchema);
    }

    

  module.exports = {
      createTemplate,
      getTemplates,
      getOneTemplate,
      deleteTemplate
  }