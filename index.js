// Import packages (JS import)
// general
const fs = require('fs');
const path = require('path');


// installed
const express = require('express');
const { loginValidation, registrationValidation } = require('./middlewares/authentication');
const { tokenretrieve } = require('./middlewares/tokenretrieve');
const mongoose = require('mongoose');



// For reference, we are not using this code but we were studying...


mongoose.connect('mongodb://localhost:27017/x-company');

mongoose.connection.on('connected', () => {
  console.log('Connected');
});

mongoose.connection.on('error', () => {
  console.log('Disconnected');
});

require('./models/user');


// Initialization
const app = express()

// To be removed from here later on, we are going to use .env it's more professional way. 
const port = 8080;

// Configuration: We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())


// Random api it will be removed later on.
app.post('/add-random', (req, res, next) => {
  const User = mongoose.model('user');
  const user = new User({ email: "khaled.ra@hotmail.com", firstName: 'hello', lastName: 'ramadan' });
  user.save().then(() => {
    res.status(201).send("Haliluya")
  }).catch(exception => {
    res.status(400).send(exception);
  });
});


app.post('/login', loginValidation, (req, res, next) => {
  // 3. We have to go the database in order to validate it. 


  // 4. return the token the user.
  res.status(200).send({
    token: "to be retreived"
  });

});

// The below code will be refactored.
app.post('/register', registrationValidation, tokenretrieve, (req, res, next) => {
  
});


// It's an endpoint '/login'.  
// app.post('/login', loginValidation, (req, res, next) => {
//   res.status(200);
// });


// Running the server on a specific port. 
app.listen(port, () => {
  // Telling us that the server is successfully running.
  console.log(`The nodejs application is listining on port: ${port}`);
});













// var http = require('http');

// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080