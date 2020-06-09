const mongoose = require('mongoose');
const Joi = require('joi');

// create schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    }
});

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

exports.genreSchema = genreSchema;

exports.validateGenre= validateGenre;