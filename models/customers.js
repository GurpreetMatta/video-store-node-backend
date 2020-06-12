const mongoose = require('mongoose');
const Joi = require('joi');

// create schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).max(10).required(),
    isGold: Joi.boolean().required()
  };

  return Joi.validate(genre, schema);
}

exports.customerSchema = customerSchema;

exports.validateCustomer = validateCustomer;