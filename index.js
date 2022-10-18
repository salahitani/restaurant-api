// Installed packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Internal Routes
const authRouter = require('./api/authentication');


// Temp here
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

// Configuration 

// We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())
// We allowing the localhost to access our code.
app.use(cors())
// We adding a prefix to the authentications apis
app.use('/v1/api/auth', authRouter);

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