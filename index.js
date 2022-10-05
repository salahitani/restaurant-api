// Import packages (JS import)
const express = require('express');
const { loginValidation } = require('./middlewares/authentication');

// Initialization
const app = express()

// To be removed from here later on, we are going to use .env it's more professional way. 
const port = 8080;

// Configuration: We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())


app.post('/login', loginValidation, (req, res, next) => {
  // 3. We have to go the database in order to validate it. 

  // 4. return the token the user.
  res.status(200).send({
    token: "to be retreived"
  })

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