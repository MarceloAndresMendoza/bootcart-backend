import express from 'express';
import cors from 'cors';
import productRouter from './routes/store.routes.js';
import usersRouter from './routes/users.routes.js';
import utilsRouter from './routes/utils.routes.js';
import dotenv from 'dotenv';
import { db } from './config/config.js';
import { logger } from './utils/logger.js';
import { getSunbeamStatus } from './controllers/sunbeam.controller.js';

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
app.use(cors(corsOptions));

app.use('/api/pre0', productRouter);
app.use('/api/pre0', usersRouter);
app.use('/api/pre0', utilsRouter)

db();



app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    getSunbeamStatus();
})