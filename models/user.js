const mongoose = require('mongoose');

// The conditions to accept a document. (Record)
// Configuration
const userSchema = new mongoose.Schema({
  email: {
    type: String, // !
    unique: true, // ?
    lowercase: true,
    trim: true,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  hash: String,
  salt: String,
});

userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next({ error: 'Unique data entered is already in use.' });
  } else {
    next(error);
  }
});

// configuration
mongoose.model('user', userSchema);

// modules.export = userModel;
