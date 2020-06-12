const mongoose = require('mongoose');
const Joi = require('joi');

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

const User = mongoose.model('User', userSchema);

function validateUser(body) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
        role: Joi.string()
    }
    return Joi.validate(body, schema);
}

exports.User = User;
exports.validateUser = validateUser;