import mongoose from 'mongoose';

export const db = async () => {
    const DB_NAME = process.env.DB_NAME;
    try {
        await mongoose.connect(DB_NAME,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB:", DB_NAME);
    } catch (error) {
        console.error(`Error connecting to db: ${error}`)
    }
}
export const checkDBConnection = async (req, res) => {
    const DB_STATUS_PAGE_URL = process.env.DB_HTTP_STATUS_PAGE;
    try {
        const response = await fetch(DB_STATUS_PAGE_URL);
        if (response.status === 200) {
            res.status(200).json({ message: 'Database is up and running' });
        } else {
            res.status(500).json({ message: 'Error connecting to DB' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error connecting to DB' });
    }
}

export const checkNodeMailerServer = async (req, res) => {
    const NODEMAILER_URL = process.env.NODEMAILER_URL;
    try {
        const response = await fetch(NODEMAILER_URL);
        if (response.status === 200) {
            res.status(200).json({ message: 'NodeMailer is up and running' });
        } else {
            res.status(500).json({ message: 'Error connecting to NodeMailer' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error connecting to NodeMailer' });
    }
}

export const checkSunbeamServer = async (req, res) => {
    const SUNBEAM_URL = process.env.SUNBEAM_URL;
    try {
        const response = await fetch(SUNBEAM_URL);
        if (response.status === 200) {
            res.status(200).json({ message: 'Sunbeam is up and running' });
        } else {
            res.status(500).json({ message: 'Error connecting to Sunbeam' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error connecting to Sunbeam' });
    }
}