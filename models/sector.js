const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  sector: {
    type: String,
    required: true,
  },
  subSectors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubSector'
  }]
});

module.exports = mongoose.model('Sector', sectorSchema);
