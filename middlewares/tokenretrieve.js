
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenretrieve = (req, res, next) => {
    // 3. We have to go the database in order to validate it. 
    const { password, email, firstName, lastName } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    
    const User = mongoose.model('user');
    const user = new User({ email, firstName, lastName, salt, hash });
    user.save().then((data) => {
        // 4. return the token the user.
        const packageJsonPath = path.join(__dirname, 'secretkey.pem');
        fs.readFile(packageJsonPath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const token = jwt.sign({ id: data._id }, 'shh')
            res.status(200).send({
                token
            });
        });
    }).catch(exception => {
        console.log(exception);
        res.status(400).send(exception);
    });

}

// JS export 
module.exports = {
    tokenretrieve: tokenretrieve,
 };