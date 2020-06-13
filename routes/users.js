const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
// register user 
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('user already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email', 'role']))
});

// current login user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
})
module.exports = router;