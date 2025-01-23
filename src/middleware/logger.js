const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define el formato de los logs
const logFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
  return `${formattedDate} [${level}]: ${message}`;
});

// Crea el logger
const logger = createLogger({
  level: 'info', // Nivel de log (info, warn, error, etc.)
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: 'logs/app.log' }), // Archivo donde se almacenarán los logs
    new transports.Console(), // También muestra los logs en la consola
  ],
});

module.exports = logger;
