
const router = require('express').Router();
const userSchema = require('../models/userModel');
const subSectorSchema=require('../models/subSector');
const sectorSchema=require('../models/sector')


router.post('/user/update/:id', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: 'Please fill user name & email' });
    }
    const user = await userSchema.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.userName = req.body.userName || user.userName;
      user.address = req.body.address || user.address;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      es.status(400).send({ message: 'User Not Found' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/sectors', async (req, res) => {
  try { 
    const sectors = await sectorSchema.find();
      res.send(sectors);
    
  } catch (error) {
    console.log(error);
  }
});

router.get('/subsectors/:id', async (req, res) => {

  try { 
    const newUser = await subSectorSchema.find({sector:req.params.id});
      res.send(newUser);
    
  } catch (error) {
    console.log(error);
  }
});

router.get('/userget', async (req, res) => {
    try { 
      const user = await userSchema.find();
        res.send(user[0]);
      
    } catch (error) {
      console.log(error);
    }
  });

router.put('/save', async (req, res) => {

  try {
    const { name,isAgreeToTerms,isSaved,selectedSectors } = req.body;

    const user = await userSchema.find();
    
      user[0].name = name;
      user[0].isAgreeToTerms = isAgreeToTerms;
      user[0].isSaved = isSaved;
      user[0].selectedSectors = selectedSectors;
      const updatedUser = await user[0].save();
      res.send({ message: 'User Updated', user: updatedUser });
    
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
