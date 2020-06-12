const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genres');
// schema
const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        trim: true,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

function validateMovies(body) {
    const validate = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(body, validate);
}

exports.movieSchema = movieSchema;
exports.validateMovies = validateMovies;