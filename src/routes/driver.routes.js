const express = require('express');
const router = express.Router();
const multer = require('multer');
const driverController = require('../controllers/driver.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/register', upload.single('photo'), driverController.register);
router.post('/login', driverController.login);
router.get('/', driverController.listAll);

module.exports = router;
