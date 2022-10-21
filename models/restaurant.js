const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  cuisine: {
    type: String,
    required: true
  }
});

mongoose.model('restaurant', restaurantSchema);

