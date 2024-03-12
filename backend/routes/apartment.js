const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');

// Route to get all apartments
router.get('/', async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific apartment by ID
router.get('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new apartment
router.post('/', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newApartment = new Apartment({ title, description, price });
    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing apartment
router.put('/:id', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, { title, description, price }, { new: true });
    if (!updatedApartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.json(updatedApartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an apartment
router.delete('/:id', async (req, res) => {
  try {
    const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!deletedApartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
