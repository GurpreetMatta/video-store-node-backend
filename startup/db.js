const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    // create connection
    mongoose.connect(config.get('db'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => winston.info('CONNECTION ESTABLISHED....'));
}