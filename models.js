const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser(username, hashedPassword);
}

async function loginUser(username, password) {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return { token, userId: user._id };
}

module.exports = { registerUser, loginUser, saveImage, getUserImages };
