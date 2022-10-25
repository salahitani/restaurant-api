const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
})

router.post('/upload-logo', multer({ storage }).single('logo'), (req, res, next) => {

});

router.post('/', (req, res, next) => {
  const { name, description, cuisine } = req.body;
  const RestaurantModel = mongoose.model('restaurant');
  const restaurant = new RestaurantModel({ name, description, cuisine, logo });
  restaurant.save().then((data) => {
    res.status(200).json({
      data
    })
  });
  res.status(200).json({
    data: ""
  })
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