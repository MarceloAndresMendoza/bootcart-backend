import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res) => {
    // ADMIN AUTH
    try {
        const currentUser = await User.findOne({username : req.username});
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({error: 'No se encontraron datos de usuarios'});
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).json({error: 'No se encontraron datos de productos'});
    }
}

export const signUp = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        if (!username || !firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please, fill up all required data" });
        }

        const verifyUser = await User.findOne({ email: email });

        if (verifyUser) {
            return res.status(409).json({ message: "A user with this email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        newUser.role = 'user'; // force setting up the user role to avoid manipulation
        // Admins can then, once created, set an user to Admin role.
        const savedUser = await newUser.save();
        res.status(201).json({
            message: `User ${savedUser.firstName} ${savedUser.lastName} has been successfully created.`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Unable to add the user', error: error });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const verifyUserByEmail = await User.findOne({ email: email });
        if (!verifyUserByEmail) {
            return res.status(404).send("The user doesn't exist");
        }
        const verifyPassword = await bcrypt.compare(password, verifyUserByEmail.password);

        if (!verifyPassword) {
            return res.status(403).send('Invalid credentials');
        }
        // Include the user's role in the JWT token
        const expireTime = Math.floor(new Date().getTime() / 1000) + 3600; // 1 hour
        const token = jwt.sign(
            {
                exp: expireTime,
                data: {
                    id: verifyUserByEmail._id,
                    username: verifyUserByEmail.username,
                    email: verifyUserByEmail.email,
                    firstName: verifyUserByEmail.firstName,
                    lastName: verifyUserByEmail.lastName,
                    role: verifyUserByEmail.role
                }
            },
            process.env.SECRET_KEY
        );
        res.json(token);
    } catch (error) {
        res.status(500).json({ message: 'Error in the server', error: error });
    }
};
