const Fields = require('../../models/fields');
const Joi = require('joi');
const { template } = require('..');

const createFileds = async (req, res) => {
  const { error } = validateFields(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        let fields = {
          ceremony_id: body.ceremony_id,
          template_id: body.template_id,
          fields: body.fields
        };
        let newFields = new Fields(fields);
        try {
          await newFields.save();
          res.send({
            ok: true,
            message: 'New Fields created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in create Fields'
          })
        }
  }
  } 

  const getFields = async function (req, res) {
      let template_id = req.params.template_id;
      let ceremony_id = req.params.ceremony_id;
      let field = [];
      try {
        let fields = await Fields.find();
        if (fields.length > 0) {

            for( let i=0; i < fileds.length; i++) {
                    if ( fields[i].ceremony_id == ceremony_id && fields[i].template_id == template_id ) {
                            field.push(fields[i]);
                    }
            }
            res.status(200).json(field);
        } else {
            res.send({
              ok: false,
              message: 'Template not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Template'
          })
      }
  }


  const deleteFields = async function (req, res) {
    let id = req.params.id;
    try {
      await Fields.findByIdAndDelete(id);
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

  function validateFields(fields) {
    const fieldsSchema = {
        ceremony_id: Joi.string().required().min(20), 
        template_id: Joi.string().required().min(20), 
        fields: Joi.array().items(Joi.string())
    }
    return Joi.validate(fields, fieldsSchema);
    }

    

  module.exports = {
      createFileds,
      getFields,
      deleteFields
  }