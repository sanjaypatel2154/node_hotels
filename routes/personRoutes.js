const express = require('express');
const router = express.Router();
const Person = require('../modelss/Person');

router.post('/', async (req,res) =>{
    try{
        const data = req.body // Assuming the request body conatains the person data
    
        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
    
        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
      }
    catch(err){
      console.log(err);
    res.status(500).json({error: 'Internal Server Erro'});
    }
  })

  // GET method to get the person
router.get('/', async (req,res) => {
    try{
      const data = await Person.find();
      console.log('data fatched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
    res.status(500).json({error: 'Internal Server Erro'});
    }
  })

  router.get('/:workType', async (req, res) => {
    try {
    const workType = req.params.workType; // Extract the work typefrom the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(500).json({err: 'Inavailid work type'});
    }
    
    } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    //UPDATING the DATA
router.put('/:id', async (req,res) =>{
  try{
      const personId = req.params.id; //Extract the id form the URL Perameter
      const updatePersonData = req.body; //update data for the person

      const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
        new: true, //Return the updated document
        runValidators: true, //Run mongoose validation
      })
      if (!response) {
        return res.status(404).json({ error: 'Person not found'});
      }

      console.log('data updated');
      res.status(200).json(response);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})


router.delete('/:id', async (req,res) =>{
  try {
    const personId = req.params.id; //Extract the id form the URL Perameter
  
  //Assuming you have a Person Model
  const response = await Person.findByIdAndDelete(personId);

  if (!response) {
    return res.status(404).json({ error: 'Person not found'});
  }

  
  console.log('data deleted');
  res.status(200).json({Message: 'Person Deleted Successfully'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})
    module.exports = router;