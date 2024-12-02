"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: 'User already exists' });
        // Hash password and create user
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const newUser = new User_1.User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        // Validate password
        const isValid = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isValid)
            return res.status(401).json({ error: 'Invalid credentials' });
        // Generate JWT
        const token = (0, jwt_1.generateToken)(user._id.toString());
        res.json({ message: 'Login successful', token });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};
exports.login = login;
