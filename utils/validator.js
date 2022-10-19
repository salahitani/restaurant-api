class ValidatorUtils {
  validateEmail = (email) => {
    const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailExpression.test(email);
  };
  validatePassword = (password) => {
    const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordExpression.test(password);
  }
}

module.exports = ValidatorUtils;

// Note: it's equal to the below.
// module.exports = {
//     validateEmail: validateEmail
// }