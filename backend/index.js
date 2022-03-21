const express = require('express'); // incldues express js
const app = express(); // variable for express
const bodyParser = require('body-parser'); // includes bodyParser
const mongoose = require('mongoose'); // includes mongoose
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config.json');
const Project = require('./models/project.js');
const port = 5000;

app.use((req,res,next)=>{
    console.log(`${req.method} request ${req.url}`);
    next();
  })
  
  app.use(bodyParser.json());//calling body parser method
  app.use(bodyParser.urlencoded({extended:false})); // preventing url from being parsed
  
  app.use(cors()); // calling cors method with express
  
  app.get('/', (req,res)=> res.send('Hello! Im am from the backend!'));


mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('DB Connected'))
.catch(err=>{
    console.log(`DB Connection Error: ${err.message}`)
});

app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`))



  // Post a product to the database

app.post('/addProject',(req,res)=>{
  const dbProject = new Project({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    image_url: req.body.image_url,
    description: req.body.description,
    author: req.body.author,
    url: req.body.url
  });
  // save to database and to notify the user
  dbProject.save().then(result=>{
    res.send(result);
  }).catch(err=>res.send(err));
})




// Update Product on DataBase

app.patch('/updateProject/:id',(req,res)=>{
  const idParam = req.params.id;
  Project.findById(idParam,(err,project)=>{
      const updatedProject = {
        name: req.body.name,
        image_url: req.body.image_url,
        description: req.body.description,
        author: req.body.author,
        url: req.body.url
      }
      Project.updateOne({_id:idParam}, updatedProject).
      then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
  })
})




// Delete product from DB

app.delete('/deleteProject/:id',(req,res)=>{
  const idParam = req.params.id;
  Project.findOne({_id:idParam}, (err,project)=>{
    if(project){
      Project.deleteOne({_id:idParam},err=>{
        console.log('deleted on backend request');
      });
    } else {
      alert('Not found');
    }
  }).catch(err=> res.send(err));

});//delete





// Get all Products for the Database
app.get('/allProjectsFromDB',(req,res)=>{
  Project.find().then(result=>{
    res.send(result);
  })
})

// Get single project

app.get('/allProjectsFromDB/',(req,res)=>{
  const idParam = req.params.id;
  Project.findOne({_id:idParam}, (err,project)=>{
    res.send(project);
  }).catch(err=> res.send(err));

});//get single project