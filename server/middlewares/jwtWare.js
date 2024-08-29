const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const jwtWare = async (req, res, next) => {
    try {
        console.log(req.headers);
        const authHeader = req.headers.accesstoken;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader;
        // // if (!token) {
        // //     return res.status(401).json({ message: 'Token missing' });
        // }

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = jwtWare;
