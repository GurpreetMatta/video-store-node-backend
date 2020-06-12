const express = require('express');
const router = express.Router();
const { rentalsSchema, validateSchema } = require('../models/rentals');
const mongoose = require('mongoose');
const { Customer } = require('./customers');
const { Movie } = require('./movies');
// rentals model
const Rental = mongoose.model('Rental', rentalsSchema);

// api to get all rentals
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('dateout');
    res.send(rentals);
});

// api to get rentals by id
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);;
    if (!rental)
        return res.status(404).send('rental with given id no;t found');

    res.send(rental);
});

// create rental
router.post('/', async (req, res) => {
    const { error } = validateSchema(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
        return res.status(404).send('customer not found');
    const movie = await Movie.findById(req.body.movieId);
    if (!movie)
        return res.status(404).send('movie not found');

    if (movie.numberInStock === 0)
        return res.status(400).send('not in stock');
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    return res.send(rental);
});

module.exports = router;