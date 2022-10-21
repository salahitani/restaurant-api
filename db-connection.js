const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.LOCAL_DATABASE_PATH);

mongoose.connection.on('connected', () => {
  console.log('Connected');
});

mongoose.connection.on('error', () => {
  console.log('Disconnected');
});

require('./models/user');
require('./models/restaurant');

module.exports = mongoose;