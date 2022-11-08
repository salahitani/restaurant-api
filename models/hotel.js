const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  location: {
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

mongoose.model('hotel', hotelSchema);

