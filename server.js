const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
                                                          
app.get('/', function (req,res) {
  res.send('Welcome to my Hotel... How i can help you ?, we have list of menu')
})

// Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

//Use the router
app.use('/person', personRoutes);
app.use('/MenuItem', menuRoutes);



app.listen(3000, () => {
  console.log('listening on port 3000');
})