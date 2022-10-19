const express = require('express');
const router = express.Router();

const { loginValidation, registrationValidation, encryptPassword, generateToken, validatePassword } = require('../middlewares/authentication');
const { saveUser, checkUserByEmail } = require('../controllers/user');

router.post('/login', loginValidation, checkUserByEmail, validatePassword, generateToken, (req, res, next) => {
  const token = res.locals.token;
  res.status(200).json({
    token
  });
});

router.post('/register', registrationValidation, encryptPassword, saveUser, generateToken, (req, res, next) => {
  const token = res.locals.token;
  res.status(200).json({
    token
  });
});

module.exports = router;