const winston = require('winston');
// const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = winston.format;
var fluent_logger = require('fluent-logger').createFluentSender('tag_prefix', {
  host: process.env.FLUENTD_HOST || 'localhost',
  port: process.env.FLUENTD_PORT || 24224,
  timeout: 3.0,
  reconnectInterval: 600000 // 10 minutes
});

// require('winston-fluentd').FluentTransport;
// fluent_logger = require('fluent-logger').configure('app', {
  // host: process.env.FLUENTD_HOST || 'localhost',
  // port: process.env.FLUENTD_PORT || 24224,
//   timeout: 3.0,
//   reconnectInterval: 60000,
// });


var fluent_config = {
  host: process.env.FLUENTD_HOST || 'localhost',
  port: process.env.FLUENTD_PORT || 24224,
  timeout: 3.0,
  requireAckResponse: true // Add this option to wait response from Fluentd certainly
};

var fluentTransport = require('fluent-logger').support.winstonTransport();
var fluent = new fluentTransport('mytag', fluent_config);

// Crea el logger
const logger = winston.createLogger({
  level: 'info', // Nivel de log (info, warn, error, etc.)
  // format: combine(timestamp(), logFormat),
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }), // Archivo donde se almacenarán los logs
    new winston.transports.Console(), // También muestra los logs en la consola
    fluent
  ],
});

// Define el formato de los logs
const logFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
  return `${formattedDate} [${level}]: ${message}`;
});

module.exports = logger;
