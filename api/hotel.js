const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();
const { verifyToken } = require('../middlewares/authentication');


//Save a Hotel
router.post('/', verifyToken, (req, res, next) => {
  const { name, stars, location, logo } = req.body;
  const createdBy = res.locals.userId;
  const HotelModel = mongoose.model('hotel');
  const objectId = mongoose.Types.ObjectId(createdBy);
  const hotel = new HotelModel({ name, stars, location, logo, createdBy: objectId });
  hotel.save().then((data) => {
    res.status(200).json({
      data
    })
  });
});

//Retrieve a hotel by ID
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const HotelModel = mongoose.model('hotel');
  HotelModel.findById(id).then(data => {
    if (!data) {
      return res.status(404).send('Hotel not found.')
    }
    res.status(200).json({
      data
    });
  }).catch(exception => {
    res.status(500).send(exception);
  });
});

//Retrieve Hotels by User
router.get('/', verifyToken, (req, res, next) => {
  const HotelModel = mongoose.model('hotel');
  const userId = res.locals.userId;
  const objectId = mongoose.Types.ObjectId(userId);
  HotelModel.find({ createdBy: objectId }).then(data => {
    res.status(200).json({
      data
    })
  });
});








module.exports = router;