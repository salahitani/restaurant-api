const express = require('express');
const router = express.Router();

const { loginValidation, registrationValidation, encryptPassword, generateToken } = require('../middlewares/authentication');
const { saveUser } = require('../controllers/user');

router.post('/login', loginValidation, (req, res, next) => {
  // 3. We have to go the database in order to validate it. 
  // 4. return the token the user.
  res.status(200).send({
    token: "to be retreived"
  });

});

router.post('/register', registrationValidation, encryptPassword, saveUser, generateToken, (req, res, next) => {
  const token = res.locals.token;
  res.status(200).json({
    token
  });
});

module.exports = router;