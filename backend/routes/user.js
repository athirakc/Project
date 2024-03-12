const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific user by ID

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to add a new user

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to login a user

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const theUser = await User.findOne({email});
        if (!theUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, theUser.password);
        if (!match) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }
        const token=jwt.sign({id:theUser._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.header("auth-token", token).json({ message: "login successfully", token: token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update an existing user

router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true });
        if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a user

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
