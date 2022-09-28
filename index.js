const express = require('express');
const app = express();
const port = 8080;

app.use(express.json())



// app.get('/hello-world', (req, res) => {
//     res.send('Hello World!')
// });

// app.post('/restaurant', (req, res) => {
//     console.log(req.body);
//     res.end();
// });

app.post('/login', (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Credentials are needed here')
    } else {
        next();
    }
}, (req, res) => {
    // in next session will go the users table in order to check credentials
    res.status(200).send("We are checking our db");
});

app.post('/register', (req, res) => {

});

app.listen(port, () => {
    console.log(`The nodejs application is listining on port: ${port}`);
});













// var http = require('http');

// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080