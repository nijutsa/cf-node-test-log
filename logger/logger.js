const { format, createLogger, transports } = require('winston');
require("winston-daily-rotate-file");
require("winston-mongodb");

const { combine, timestamp, label, prettyPrint } = format;

const CATEGORY = "winston custom format";

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.logs",
    datePattern: "DD-MM-YY",
    maxFiles: "14d"
})

const logger = createLogger({
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
           format: "DD-MM-YY HH:mm:ss"     
        }),
        // prettyPrint()
        
         format.json()
    ),
    transports: [
        fileRotateTransport,
        new transports.File({
            filename: "logs/example.log"
        }),
        new transports.Console()
    ]
})

module.exports = logger;

