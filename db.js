const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Use Atlas URI if hosted on MongoDB Atlas
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('fusionVision'); // Replace with your database name
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

module.exports = connectDB;
