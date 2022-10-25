const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', (req, res, next) => {
  const { name, description, cuisine, logo } = req.body;
  const RestaurantModel = mongoose.model('restaurant');
  const restaurant = new RestaurantModel({ name, description, cuisine, logo });
  restaurant.save().then((data) => {
    res.status(200).json({
      data
    })
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const RestaurantModel = mongoose.model('restaurant');
  RestaurantModel.findById(id).then(data => {
    res.status(200).json({
      data
    })
  });
});

router.get('/', (req, res, next) => {
  const RestaurantModel = mongoose.model('restaurant');
  RestaurantModel.find().then(data => {
    res.status(200).json({
      data
    })
  });
});


module.exports = router;