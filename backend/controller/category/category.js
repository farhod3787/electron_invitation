const Category = require('../../models/admin');
const Admin = require('../admin/admin');
const Joi = require('joi');
const config = require('../../config/config');

const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        const file = req.file;
        const token = req.params.token;
        // console.log(token);
        
        let category = {
          name: body.name,
          logo: file.filename
        };
        let newCategory = new Category(category);
        try {
          await newCategory.save();
          res.send({
            ok: true,
            message: 'New Category created'
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



  function validateCategory(category) {
    const categorySchema = {
        name: Joi.string().required().min(3) 
    }
    return Joi.validate(category, categorySchema);
    }

    

  module.exports = {
      createCategory
  }