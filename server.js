import express from 'express';
import productRouter from './routes/store.routes.js';
import usersRouter from './routes/users.routes.js';
import dotenv from 'dotenv';
import { db } from './config/config.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/pre0', productRouter)
app.use('/api/pre0', usersRouter)

db();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})