const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../db'); // Import your DB connection

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in .env');
    process.exit(1); // Exit if JWT secret is missing
}

async function registerUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const db = await connectDB();
        const result = await db.collection('users').insertOne({ username, password: hashedPassword });
        return result.insertedId;
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw new Error('Registration failed');
    }
}

async function loginUser(username, password) {
    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        return { token, userId: user._id };
    } catch (error) {
        console.error('Error logging in user:', error.message);
        throw new Error('Login failed');
    }
}

async function saveImage(userId, imageUrl, description) {
    try {
        const db = await connectDB();
        const result = await db.collection('images').insertOne({ userId, imageUrl, description, createdAt: new Date() });
        return result.insertedId;
    } catch (error) {
        console.error('Error saving image:', error.message);
        throw new Error('Saving image failed');
    }
}

async function getUserImages(userId) {
    try {
        const db = await connectDB();
        const images = await db.collection('images').find({ userId }).toArray();
        return images;
    } catch (error) {
        console.error('Error retrieving user images:', error.message);
        throw new Error('Retrieving images failed');
    }
}

module.exports = { registerUser, loginUser, saveImage, getUserImages };
