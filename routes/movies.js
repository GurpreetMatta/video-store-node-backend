const express = require('express');
const router = express.Router();
const { movieSchema, validateMovies } = require('../models/movies');
const mongoose = require('mongoose');
const { Genre } = require('./genres')
const Joi = require('@hapi/joi');

// model
const Movie = mongoose.model('Movie', movieSchema);

// get all movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    return res.send(movies);
});

// get movie by id
router.get('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).send('movie not found');
    res.send(movie);
});

// create movie 
router.post('/', async (req, res) => {
    const { error } = validateMovies(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send(error.details[0].message);
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

// update movie 
router.put('/:id', async (req, res) => {
    const { error } = validateMovies(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send(error.details[0].message);
    let movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });
    return res.send(movie);
});

// Delete movie
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});

module.exports = router
module.exports.Movie = Movie;