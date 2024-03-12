const express = require('express');
const router = express.Router();
const Land = require('../models/Land');

// Route to get all land
router.get('/', async (req, res) => {
  try {
    const lands = await Land.find();
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific piece of land by ID
router.get('/:id', async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json(land);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add new land
router.post('/', async (req, res) => {
  const { title, description, location } = req.body;
  let protocol;

  if(req.secure){
      protocol = 'https'
  }else{
      protocol = 'http'
  }

  let image_url  = protocol + '://' + req.get('host')+"/"+req.file.path;


  try {
    const newLand = new Land({ 
      title, 
      description, 
      location,
      image: image_url,
    });
    const savedLand = await newLand.save();
    res.status(201).json(savedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing piece of land
router.put('/:id', async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const updatedLand = await Land.findByIdAndUpdate(req.params.id, { title, description, location }, { new: true });
    if (!updatedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json(updatedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete land
router.delete('/:id', async (req, res) => {
  try {
    const deletedLand = await Land.findByIdAndDelete(req.params.id);
    if (!deletedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json({ message: 'Land deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
