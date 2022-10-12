const mongoose = require('mongoose');

// Database interactivity
const saveUser = (req, res, next) => {
	const { salt, hash } = res.locals.encryptedPassword;
	const { email, firstName, lastName } = req.body;
	const UserModel = mongoose.model('user');
	const user = new UserModel({ email, firstName, lastName, salt, hash });
	user.save().then((data) => {
		const userId = data._id.toString();
		res.locals.userId = userId;
		next();
	}).catch((exception)=> {
		res.status(400).send(exception);
	});
};

module.exports = {
	saveUser
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


