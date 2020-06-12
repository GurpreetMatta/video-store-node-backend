const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/users');
const _ = require('lodash');
// register user 
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('user already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'USER'
    });
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email', 'role']))
});

module.exports = router;