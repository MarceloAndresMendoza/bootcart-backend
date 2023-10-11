// =============================================================
// DBF NodeMailer mail server controller
// Author: Marcelo Mendoza
// Created: 2023-10-11
// Description: This controller handles the API calls to the
//              NodeMailer mail server.
// =============================================================
import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();

export const getNodeMailerStatus = async () => {
    // Connect to NodeMailer server and get the status
    try {
        const response = await axios.get(process.env.NODEMAILER_URL );
        if (response.status === 200) {
            logger.info(`NodeMailer mail server is running on ${process.env.NODEMAILER_URL}`);
            return true;
        } else {
            logger.error(`ERROR connecting to NodeMailer server ${process.env.NODEMAILER_URL}`);
            return false;
        }

    } catch (error) {
        logger.error(`ERROR connecting to NodeMailer server ${process.env.NODEMAILER_URL} - ${error}`);
        return false;
    }
}