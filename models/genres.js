const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// create schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50
  }
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}

exports.genreSchema = genreSchema;

exports.validateGenre = validateGenre;