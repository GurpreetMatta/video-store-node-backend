const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'SUPERADMIN', 'STOREADMIN']
    }
});

userSchema.methods.genrateToken = function () {
    var token = jwt.sign({
        name: this.name,
        id: this._id,
        role: this.role
    }, config.get('jwtSecret'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(body) {

    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity(),
        role: Joi.string()
    });
    return schema.validate(body);
}

function validateLogin(body) {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: passwordComplexity(),
    });
    return schema.validate(body);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin