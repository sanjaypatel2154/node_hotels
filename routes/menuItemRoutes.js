const express = require('express');
const router = express.Router();
const MenuItem = require('../modelss/MenuItem');    


router.post('/', async (req,res) =>{
    //<---Asyn & Await-->>
    try{
      const data = req.body // Assuming the request body conatains the person data
  
      //Create a new Person document using the Mongoose model
      const newItem = new MenuItem(data);
  
      //Save the new person to the database
      const response = await newItem.save();
      console.log('data saved');
      res.status(200).json(response);
    }
  catch(err){
    console.log(err);
  res.status(500).json({error: 'Internal Server Erro'});
  }
})

router.get('/', async (req,res) => {
  try{
    const data = await MenuItem.find();
    console.log('data fatched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
  res.status(500).json({error: 'Internal Server Erro'});
  }
})



module.exports = router;