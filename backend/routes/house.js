const express = require('express');
const router = express.Router();
const House = require('../models/House');

// Route to get all houses
router.get('/', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific house by ID
router.get('/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(house);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new house
router.post('/', async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const newHouse = new House({ title, description, location });
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing house
router.put('/:id', async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, { title, description, location }, { new: true });
    if (!updatedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json(updatedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a house
router.delete('/:id', async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.json({ message: 'House deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
