
var validator = require("email-validator");

// We are planning to rely on this file (module instead of writing the validation in the index directly)



const loginValidation = (req, res, next) => {
  // 1. Catch the Credentials
  const { email, password } = req.body;

  // 2. Validate the Credentials
  if (!email && password) {
    res.status(400).send({
      errors: {
        "email": "Email is empty"
      }
    });
  }

  if (!password && email) {
    res.status(400).send({
      errors: {
        "password": "Password is empty"
      }
    });
  }

  if (!email && !password) {
    res.status(400).send({
      errors: {
        "password": "Password is empty",
        "email": "Email is empty"
      }
    });
  }
 
};


const registrationValidation = (req, res, next) => {
  // 1. Catch the Credentials
  const { fName, lName, email, password, confirmpassword } = req.body;

  // 2. Validate the Credentials
  if (!fName) {
    res.status(400).send({
      errors: {
        "fName": "First Name is empty"
      }
    });
  }

  if (fName && !isNaN(fName)) {
    res.status(400).send({
      errors: {
        "fName": "First Name Should not be a number"
      }
    });
  }

  if (!lName) {
    res.status(400).send({
      errors: {
        "lName": "Last Name is empty"
      }
    });
  }

  if (lName && !isNaN(lName)) {
    res.status(400).send({
      errors: {
        "lName": "Last Name Should not be a number"
      }
    });
  }

  if (!email) {
    res.status(400).send({
      errors: {
        "email": "Email is empty"
      }
    });
  }

  if (email && !validator.validate(email)) {
    res.status(400).send({
      errors: {
        "email": "Wrong Email Format"
      }
    });
  }

  if (!password) {
    res.status(400).send({
      errors: {
        "password": "Password is Empty"
      }
    });
  }

  if (password.length < 6) {
    res.status(400).send({
      errors: {
        "password": "Password is Short"
      }
    });
  }

  if (!confirmpassword) {
    res.status(400).send({
      errors: {
        "confirmpassword": "Confirm Password is Empty"
      }
    });
  }

  if (password != confirmpassword) {
    res.status(400).send({
      errors: {
        "confirmpassword": "Password and Confirmed Password do not match"
      }
    });
  }
  next();
}

// JS export 
module.exports = {
  loginValidation: loginValidation,
  registrationValidation: registrationValidation
};