// < ----Imports----------------------------------------------------------------------->

// Installed packages
const express = require('express');
const cors = require('cors');
require('dotenv').config()

// Internal Imports
const authRouter = require('./api/authentication');
const restaurantRouter = require('./api/restaurant');

require('./db-connection');

// < ----Initialization----------------------------------------------------------------------->

const app = express()

// < ----Configuration----------------------------------------------------------------------->

// We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())
// We allowing the localhost to access our code.
app.use(cors())
// We adding a prefix to the authentications apis
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/restaurant', restaurantRouter);

// < ----Running the app----------------------------------------------------------------------->

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