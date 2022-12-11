const mongoose = require('mongoose');

const subSectorSchema = new mongoose.Schema({
  sector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  subSector:{
    type: String,
    required: true,
  } 
});

module.exports = mongoose.model('SubSector', subSectorSchema);
