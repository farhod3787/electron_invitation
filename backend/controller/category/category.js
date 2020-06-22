const Category = require('../../models/category');
const Joi = require('joi');
const config = require('../../config/config');

const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if ( error ) {
    res.status(400).send(error.details[0].message)
  } else {
        const body = req.body;
        const file = req.file;
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

  const getCategories = async function (req, res) {
      try {
        let categories = await Category.find();
        if (categories.length > 0) {
            res.status(200).json(categories);
        } else {
            res.send({
              ok: false,
              message: 'Categories not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Categories'
          })
      }
  }

  const getOneCategory = async function (req, res) {
    let id = req.params.id;
    try {
      let category = await Category.findById(id);
      res.status(200).json(category);
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in get One Category'
         }) 
    }
  }

  const deleteCategory = async function (req, res) {
    let id = req.params.id;
    try {
      let  category = await Category.findById(id);

      fs.unlink('backend/images/' + category.logo, function (err) {
          if (err) {
          console.log(err.message);}
          else {
              console.log('File deleted!');
          }
      });
      await Category.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "Category deleted"
      })
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete Category'
         }) 
    }
  }

  function validateCategory(category) {
    const categorySchema = {
        name: Joi.string().required().min(3) 
    }
    return Joi.validate(category, categorySchema);
    }

    

  module.exports = {
      createCategory,
      getCategories,
      getOneCategory,
      deleteCategory
  }