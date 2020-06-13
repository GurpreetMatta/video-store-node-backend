const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { genreSchema, validateGenre } = require('../models/genres');
const auth = require('../middleware/auth');

// model
const Genre = mongoose.model('Genre', genreSchema);

// get all genres api
router.get('/', async (req, res) => {
  throw new Error('dsfjks')
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// create genre
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  try {
    genre = await genre.save();
  } catch (error) {
    return res.status(400).send(error.message);
  }
  res.send(genre);
});

// update genre
router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// Delete genre
router.delete('/:id',auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

// find by id
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;
module.exports.Genre = Genre;