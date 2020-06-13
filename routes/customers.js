const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { customerSchema, validateCustomer } = require('../models/customers');
const auth = require('../middleware/auth');
// model
const Customer = mongoose.model('Customer', customerSchema);

// get all customers
router.get('/', auth, async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// create customer
router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

// update customer 
router.put('/:id', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });
    res.send(customer);
});

// Delete Customer
router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

// find by id
router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});


module.exports = router;
module.exports.Customer = Customer