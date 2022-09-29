
// We are planning to rely on thsi file (module instead of writing the validation in the index directly)
const loginValidation = (req, res, next) => {
    // req: headers, body --> Frontend
    next();
    // 1. I have to check if the email is not null 
    // 2. I have to check if the password is not null 
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