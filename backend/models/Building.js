const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageNum: { type: Number, required: true },
  
});

module.exports = mongoose.model('Building', buildingSchema);
