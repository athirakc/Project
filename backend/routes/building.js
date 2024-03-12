const express = require('express');
const router = express.Router();
const Building = require('../models/Building');

// Route to get all buildings
router.get('/', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific building by ID
router.get('/:id', async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.json(building);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new building
router.post('/', async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const newBuilding = new Building({ title, description, location });
    const savedBuilding = await newBuilding.save();
    res.status(201).json(savedBuilding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing building
router.put('/:id', async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, { title, description, location }, { new: true });
    if (!updatedBuilding) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.json(updatedBuilding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a building
router.delete('/:id', async (req, res) => {
  try {
    const deletedBuilding = await Building.findByIdAndDelete(req.params.id);
    if (!deletedBuilding) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.json({ message: 'Building deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
