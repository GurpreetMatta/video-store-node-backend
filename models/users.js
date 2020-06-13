const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');


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

    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity(),
        role: Joi.string()
    });
    return schema.validate(body);
}

exports.User = User;
exports.validateUser = validateUser;