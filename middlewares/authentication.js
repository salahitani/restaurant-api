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
  next();
};


const registrationValidation = (data) => {

}

// JS export 
module.exports = {
  loginValidation: loginValidation,
  registrationValidation: registrationValidation
};