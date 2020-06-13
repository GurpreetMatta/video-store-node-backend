const config = require('config');

module.exports = function () {
    if (!config.get('jwtSecret')) {
        throw new Error('FATAL ERROR: jwt key not found');
    }
}