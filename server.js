import express from 'express';
import cors from 'cors';
import productRouter from './routes/store.routes.js';
import usersRouter from './routes/users.routes.js';
import utilsRouter from './routes/utils.routes.js';
import dotenv from 'dotenv';
import { db } from './config/config.js';
import { logger } from './utils/logger.js';
import { getSunbeamStatus } from './controllers/dbf.sunbeam.controller.js';
import { getNodeMailerStatus } from './controllers/dbf.nodemailer.controller.js';

dotenv.config();
const corsOptions={
    origin:[
        'http://localhost:5173',
    ],
    optionsSucessStatus: 100 //continue
}

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors(corsOptions));
app.use(cors());

const API_ENDPOINT = process.env.API_ENDPOINT;
app.use(API_ENDPOINT, usersRouter);
app.use(API_ENDPOINT, utilsRouter)
app.use(API_ENDPOINT, productRouter);

db();

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    getSunbeamStatus();
    getNodeMailerStatus();
})