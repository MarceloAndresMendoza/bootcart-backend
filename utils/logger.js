import winston from 'winston';

const date = new Date(Date.now());

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: date.toLocaleString(), unixtimestamp: Date.now()},
  transports: [

    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}