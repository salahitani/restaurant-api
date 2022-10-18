// Installed packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

// Internal Routes
const authRouter = require('./api/authentication');

// < ------------------------------------------------------------------------------->

// Temp here
mongoose.connect(process.env.LOCAL_DATABASE_PATH);

mongoose.connection.on('connected', () => {
  console.log('Connected');
});

mongoose.connection.on('error', () => {
  console.log('Disconnected');
});

require('./models/user');


// < ------------------------------------------------------------------------------->

// Initialization
const app = express()

// < ------------------------------------------------------------------------------->

// Configuration 

// We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())
// We allowing the localhost to access our code.
app.use(cors())
// We adding a prefix to the authentications apis
app.use('/v1/api/auth', authRouter);

// < ------------------------------------------------------------------------------->

// Running the server on a specific port. 
const port = process.env.PORT;
app.listen(port, () => {
  // Telling us that the server is successfully running.
  console.log(`The nodejs application is listining on port: ${port}`);
});













// var http = require('http');

// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080