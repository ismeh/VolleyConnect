const morgan = require('morgan');
const logger = require('../middleware/logger');

// Configura morgan para usar winston
const stream = {
    write: (message) => logger.info(message.trim())
};

const morganMiddleware = morgan('combined', { stream });

module.exports = morganMiddleware;