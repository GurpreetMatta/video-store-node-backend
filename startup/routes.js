const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies')
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    // for json body
    app.use(express.json());
    // api for genres
    app.use('/api/genres', genres);
    // api for customers
    app.use('/api/customers', customers);
    // api for movies
    app.use('/api/movies', movies);
    // api for rentals
    app.use('/api/rentals', rentals);
    // api for users
    app.use('/api/users', users);
    // api for auths 
    app.use('/api/auths', auth);
    // handle error using error middleware method
    app.use(error);
}