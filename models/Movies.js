const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
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
    const validate = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return validate.validate(body);
}

exports.movieSchema = movieSchema;
exports.validateMovies = validateMovies;