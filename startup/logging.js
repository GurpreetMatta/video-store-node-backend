require('express-async-errors');
const winston = require('winston');
const { transports } = require('winston');
const config = require('config');
require('winston-mongodb');

module.exports = function () {

    // handle unhandledRejection exception
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // handle uncaught exception
    winston.exceptions.handle(
        new transports.Console({ colorize: true, prettyPrint: true }),
        new transports.File({ filename: 'exceptions.log' }));

    // handle logging 
    winston.add(new winston.transports.File({ filename: 'combined.log' }));

    // winston mongodb
    winston.add(new winston.transports.MongoDB({ db: config.get('db') }));
}