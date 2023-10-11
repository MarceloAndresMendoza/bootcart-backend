// =============================================================
// DBF SunBeam file server controller
// Author: Marcelo Mendoza
// Created: 2023-09-10
// Description: This controller handles the API calls to the
//              SunBeam file server.
// =============================================================
import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();

export const getSunbeamStatus = async () => {
    // Connect to SunBeam server and get the status
    try {
        const response = await axios.get(process.env.SUNBEAM_URL );
        if (response.status === 200) {
            logger.info(`SunBeam file server is running on ${process.env.SUNBEAM_URL}`);
            return true;
        } else {
            logger.error(`ERROR connecting to SunBeam server ${process.env.SUNBEAM_URL}`);
            return false;
        }

    } catch (error) {
        logger.error(`ERROR connecting to SunBeam server ${process.env.SUNBEAM_URL} - ${error}`);
        return false;
    }
}