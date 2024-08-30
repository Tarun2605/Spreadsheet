const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.createUser = async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
        const { name, email, password, role } = req.body;

        const user = new User({
            name,
            email,
            password: password,
            role
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
