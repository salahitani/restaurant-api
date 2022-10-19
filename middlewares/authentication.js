
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const ValidatorUtils = require('../utils/validator');
const EncyprtionUtils = require('../utils/encryption');

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
  const validatorUtils = new ValidatorUtils();
  if (!firstName) {
    return res.status(400).send({
      errors: {
        "firstName": "First Name is empty"
      }
    });
  }

  if (!isNaN(firstName)) {
    return res.status(400).send({
      errors: {
        "firstName": "First Name Should not be a number"
      }
    });
  }

  if (!lastName) {
    return res.status(400).send({
      errors: {
        "lastName": "Last Name is empty"
      }
    });
  }

  if (!isNaN(lastName)) {
    return res.status(400).send({
      errors: {
        "lastName": "Last Name Should not be a number"
      }
    });
  }

  if (!email) {
    return res.status(400).send({
      errors: {
        "email": "Email is empty"
      }
    });
  }

  if (!validatorUtils.validateEmail(email)) {
    return res.status(400).send({
      errors: {
        "email": "Wrong Email Format"
      }
    });
  }

  if (!password) {
    return res.status(400).send({
      errors: {
        "password": "Password is Empty"
      }
    });
  }

  if (!validatorUtils.validatePassword(password)) {
    return res.status(400).send({
      errors: {
        "password": "Your passowrd is out of our criteria"
      }
    });
  }

  if (!confirmPassword) {
    return res.status(400).send({
      errors: {
        "confirmPassword": "Confirm Password is Empty"
      }
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      errors: {
        "confirmPassword": "Password and Confirmed Password do not match"
      }
    });
  }
  next();
}

const encryptPassword = (req, res, next) => {
  const { password } = req.body;
  const encyprtionUtils = new EncyprtionUtils();
  const { salt, hash } = encyprtionUtils.encryptPassword(password);
  res.locals.encryptedPassword = { salt, hash };
  next();
};

const generateToken = (req, res, next) => {
  const { _id } = res.locals.user; // ObjectId
  const id = _id.toString(); // Id
  // less secure
  // const userToken = jwt.sign({ id }, 'serect-key-dont-share-it');
  // more secure
  const secretKeyPath = path.join(__dirname, '..', 'x-company-sec.pem');
  const secretKey = fs.readFileSync(secretKeyPath, 'utf8');
  const userToken = jwt.sign({ id }, secretKey, { algorithm: 'RS256' });
  res.locals.token = userToken;
  next();
};

const validatePassword = (req, res, next) => {
  const { hash, salt } = res.locals.user;
  const { password } = req.body;
  const encyprtionUtils = new EncyprtionUtils();
  const  hashedPassword = encyprtionUtils.getHashedPassword(password, salt);
  if(hash === hashedPassword) {
    next();
    return;
  }
	return res.status(404).send({ 'error': 'Wrong email or password' });
};

// JS export 
module.exports = {
  loginValidation,
  registrationValidation,
  encryptPassword,
  generateToken,
  validatePassword
};