const express = require('express'); // incldues express js
const app = express(); // variable for express
const bodyParser = require('body-parser'); // includes bodyParser
const mongoose = require('mongoose'); // includes mongoose
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config.json');

// const Product = require('./models/product.js');
// const User = require('./models/user.js');
const port = 5000;

app.use((req,res,next)=>{
    console.log(`${req.method} request ${req.url}`);
    next();
  })
  
  app.use(bodyParser.json());//calling body parser method
  app.use(bodyParser.urlencoded({extended:false})); // preventing url from being parsed
  
  app.use(cors()); // calling cors method with express
  
  app.get('/', (req,res)=> res.send('Hello! Im am from the backend!'));