const bcrypt = require('bcrypt');
const db = require('../db');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Name, email, and password are required',
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
            [name.trim(), email.trim().toLowerCase(), hashedPassword],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(409).json({
                            message: 'Email already exists',
                        });
                    }

                    return res.status(500).json({
                        message: 'Failed to register user',
                    });
                }

                const user = {
                    id: this.lastID,
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    role: 'buyer',
                };

                const token = generateToken(user);

                return res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    user,
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: 'Server error during registration',
        });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required',
        });
    }

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email.trim().toLowerCase()],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to login' });
            }

            if (!user) {
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            }

            try {
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    user.password_hash
                );

                if (!isPasswordMatch) {
                    return res
                        .status(401)
                        .json({ message: 'Invalid email or password' });
                }

                const safeUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                const token = generateToken(safeUser);

                return res.status(200).json({
                    message: 'Login successful',
                    token,
                    user: safeUser,
                });
            } catch (compareError) {
                return res
                    .status(500)
                    .json({ message: 'Failed to verify password' });
            }
        }
    );
};

const getMe = (req, res) => {
    db.get(
        `SELECT id, name, email, role FROM users WHERE id = ?`,
        [req.user.id],
        (err, user) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Failed to fetch user' });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        }
    );
};

module.exports = {
    register,
    login,
    getMe,
};
