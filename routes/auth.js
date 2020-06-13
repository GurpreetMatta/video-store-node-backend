const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateLogin } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');


// login user 
router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid Email.');

    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword)
        return res.status(400).send('Invalid Password');
    return res.send({
        accessToken: user.genrateToken(),
        tokenType: "Bearer",
        email:user.email
    });
});

module.exports = router;