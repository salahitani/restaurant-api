// Import packages
const express = require('express');
const { check, validationResult } = require('express-validator');


// Initialization
const app = express();

// To be removed from here later on, we are going to use .env   it's more professional way. 
const port = 8080;

// Configuration: We are telling the server, that we are going to send/receive JSON formats.  
app.use(express.json())


// It's an endpoint '/login'.  
// check('email').not().isEmpty() = middleware
app.post('/login', check('email').not().isEmpty(), (req, res, next) => {
    // TODO: in next session will go the users table in order to check credentialss
    try {
        // It given by the express-validator to throw an error incase no matching the defined conditions
        validationResult(req).throw();

        // No errors 
        res.status(200).send("We are checking our db");
    } catch (exception) {
        // Exceptions throw the validationResult
        res.status(400).send(exception.errors);
        console.log(exception);
    }
});


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