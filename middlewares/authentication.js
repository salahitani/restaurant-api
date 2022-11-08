
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const ValidatorUtils = require('../utils/validator');
const EncyprtionUtils = require('../utils/encryption');

// We are planning to rely on this file (module instead of writing the validation in the index directly)
const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};


  if (!email && password) {
    errors.email = 'Email is empty';
  }

  if (!password && email) {
    errors.password = 'Password is empty';
  }

  if (!email && !password) {
    errors.email = 'Email is empty';
    errors.password = 'Password is empty';
  }

  const errorsKeys = Object.keys(errors);
  if (errorsKeys.length) {
    return res.status(400).send({
      errors
    });
  }
  next();
};


const registrationValidation = (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = {};
  const validatorUtils = new ValidatorUtils();
  if (!firstName) {
    errors.firstName = 'First name is empty';
  }

  if (firstName && !isNaN(firstName)) {
    errors.firstName = 'First name should not be a number';
  }

  if (!lastName) {
    errors.lastName = 'Last name is empty';
  }

  if (lastName && !isNaN(lastName)) {
    errors.lastName = 'Last name should not be a number';
  }

  if (!email) {
    errors.email = 'Email is empty';
  }

  if (email && !validatorUtils.validateEmail(email)) {
    errors.email = 'Wrong email format';
  }

  if (!password) {
    errors.password = 'Password is empty';
  }

  if (password && !validatorUtils.validatePassword(password)) {
    errors.password = 'Your passowrd is out of our criteria';
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is empty";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password and confirmed password do not match";
  }
  const errorsKeys = Object.keys(errors);
  if (errorsKeys.length) {
    return res.status(400).send({
      errors
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

const verifyToken = (req, res, next) => {
  const bearertoken = req.header('Authorization');
  if (!bearertoken) {
    return res.status(401).send("You are not authorized.");
  }
  const token = bearertoken.replace("Bearer ", "");
  const publicKeyPath = path.join(__dirname, '..', 'x-company-pub.pem');
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  try {
    const { id } = jwt.verify(token, publicKey);
    res.locals.userId = id;
    next();
  } catch (exception) {
    return res.status(401).send("Token is malformatted.")
  }
};

const validatePassword = (req, res, next) => {
  const { hash, salt } = res.locals.user;
  const { password } = req.body;
  const encyprtionUtils = new EncyprtionUtils();
  const hashedPassword = encyprtionUtils.getHashedPassword(password, salt);
  if (hash === hashedPassword) {
    next();
    return;
  }
  return res.status(404).send({ 'errors': 'Wrong email or password' });
};

// JS export 
module.exports = {
  loginValidation,
  registrationValidation,
  encryptPassword,
  generateToken,
  validatePassword,
  verifyToken
};