const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isAgreeToTerms:{
    type: Boolean,
    required: true,
  },
  selectedSectors:[
    {
      type: Object,
      required: false,
    }
  ],
  isSaved:{
    type:Boolean,
    required:false
  }
});

module.exports = mongoose.model('User', userSchema);
