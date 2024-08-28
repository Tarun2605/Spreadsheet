const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        var token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            console.log(token);
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            });
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const newToken = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRATION }
            );

            res.status(200).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: newToken
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
