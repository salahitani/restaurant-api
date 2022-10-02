// We are planning to rely on thsi file (module instead of writing the validation in the index directly)
const loginValidation = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    res.status(400).send({
      errors: {
        email: {
          message: "Email is required"
        }
      }
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      errors: {
        password: {
          message: "Password is required"
        }
      }
    });
    return;
  }
  next();
};


const registrationValidation = (data) => {
  // 1. I have to check if the eamil is not null 
  // 2. I have to check if the email is a correct email 
  // 3. I have to check if the password is not null
  // 4. I have to check if the confirm password is not null
  // 5. I have to check if the confirm password is matching the password. 
  // 6. I have to check if the first name is not null.
}

module.exports = {
  loginValidation: loginValidation,
  registrationValidation: registrationValidation
};