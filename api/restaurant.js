const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { verifyToken } = require('../middlewares/authentication');
const router = express.Router();

const getFileExtension = (file) => {
  const extensionArray = file.mimetype.split('/');
  let fileExtension = extensionArray[extensionArray.length - 1];
  if (fileExtension == 'svg+xml') {
    fileExtension = fileExtension.split('+')[0];
  }
  return fileExtension;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets')
  },
  filename:  (req, file, cb) => {
    const extension = getFileExtension(file);
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  }
});

router.post('/upload-logo', multer({ storage }).single('logo'), (req, res, next) => {
  const filename = req.file.filename;
  res.status(201).json({
    filename
  });
});

router.post('/', verifyToken, (req, res, next) => {
  const { name, description, cuisine, logo } = req.body;
  const createdBy = res.locals.userId;
  const RestaurantModel = mongoose.model('restaurant');
  const objectId = mongoose.Types.ObjectId(createdBy);
  const restaurant = new RestaurantModel({ name, description, cuisine, logo, createdBy: objectId });
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

router.get('/', verifyToken, (req, res, next) => {
  const RestaurantModel = mongoose.model('restaurant');
  const userId = res.locals.userId;
  const objectId = mongoose.Types.ObjectId(userId);
  RestaurantModel.find({ createdBy: objectId }).then(data => {
    res.status(200).json({
      data
    })
  });
});


module.exports = router;