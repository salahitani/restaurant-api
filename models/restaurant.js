const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    required: true
  }
});

mongoose.model('restaurant', restaurantSchema);

