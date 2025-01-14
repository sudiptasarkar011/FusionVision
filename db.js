const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

const uri = process.env.MONGODB_URI; // Fetch from .env
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(process.env.DB_NAME); // Fetch database name from .env
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

module.exports = connectDB;
