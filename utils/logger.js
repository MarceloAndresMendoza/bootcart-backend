import * as fs from 'fs';
import { getTimestamp } from './time.utils.js';
const LOGPATH = './src/logger/logdata';
const ENCODING = 'utf-8';

export const logger = (data, subject) => {
    const logData = `[${getTimestamp()}] ${data}`;

    return new Promise((resolve, reject) => {
        fs.appendFile(`${LOGPATH}${subject}.log`, `${logData}\n`, ENCODING, (err) => {
            if (err) {
                reject('Error writing to log file');
                console.error('Error writing to log file:', err);
                return;
            }
            console.log(logData);
            resolve('Log saved');
        });
    })
}