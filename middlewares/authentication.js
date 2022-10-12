
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const { validateEmail, validatePassword } = require('../utils/validator');

// We are planning to rely on this file (module instead of writing the validation in the index directly)
const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

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
  next();
};


const registrationValidation = (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName) {
    res.status(400).send({
      errors: {
        "firstName": "First Name is empty"
      }
    });
  }

  if (!isNaN(firstName)) {
    res.status(400).send({
      errors: {
        "firstName": "First Name Should not be a number"
      }
    });
  }

  if (!lastName) {
    res.status(400).send({
      errors: {
        "lastName": "Last Name is empty"
      }
    });
  }

  if (!isNaN(lastName)) {
    res.status(400).send({
      errors: {
        "lastName": "Last Name Should not be a number"
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

  if (!validateEmail(email)) {
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

  if (!validatePassword(password)) {
    res.status(400).send({
      errors: {
        "password": "Your passowrd is out of our criteria"
      }
    });
  }

  if (!confirmPassword) {
    res.status(400).send({
      errors: {
        "confirmPassword": "Confirm Password is Empty"
      }
    });
  }

  if (password !== confirmPassword) {
    res.status(400).send({
      errors: {
        "confirmPassword": "Password and Confirmed Password do not match"
      }
    });
  }
  next();
}

const encryptPassword = (req, res, next) => {
  const { password } = req.body;
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  res.locals.encryptedPassword = { salt, hash };
  next();
};

const generateToken = (req, res, next) => {
  const id = res.locals.userId;
  const userToken = jwt.sign({ id }, 'serect-key-dont-share-it');
  res.locals.token = userToken;
  next();
};

// JS export 
module.exports = {
  loginValidation,
  registrationValidation,
  encryptPassword,
  generateToken
};