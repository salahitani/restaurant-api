const mongoose = require('mongoose');

// Database interactivity
const saveUser = (req, res, next) => {
  const { salt, hash } = res.locals.encryptedPassword;
  const { email, firstName, lastName } = req.body;
  const UserModel = mongoose.model('user');
  const user = new UserModel({ email, firstName, lastName, salt, hash });
  user.save().then((data) => {
    res.locals.user = data;
    next();
  }).catch((exception) => {
    res.status(400).send(exception);
  });
};

const checkUserByEmail = (req, res, next) => {
  const UserModel = mongoose.model('user');
  const { email } = req.body;
  UserModel.findOne({ email }).then(user => {
    if (user) {
      res.locals.user = user;
      return next();
    }
    return res.status(404).send({ 'error': 'Wrong email or password' });
  });
}

module.exports = {
  saveUser,
  checkUserByEmail
};


// Vanilla JS 

// function saveUser ()  {
// 	save().then(() {
// 	najah
// }).catch(() {
// 	fishil
// })
// }

// ES6

// const saveUser = async () => {
// 	try {
// 		await save()
// 		// najah
// 	} catch (exception) {
// 		// finishl
// 	}
// };


