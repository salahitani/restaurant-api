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
  // Next session
  hash: String,
  salt: String,
});

// installation
mongoose.model('user-format', userSchema);

// modules.export = userModel;
