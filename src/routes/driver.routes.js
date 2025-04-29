const express = require('express');
const multer = require('multer');
const DriverController = require('../controllers/driver.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/drivers/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = file.originalname.split('.').pop();
    cb(null, `${timestamp}-${file.fieldname}.${ext}`);
  }
});
const upload = multer({ storage });

// Rotas públicas
router.post('/register', upload.single('photo'), DriverController.register);
router.post('/login', DriverController.login);

// Rota protegida - só acessa se enviar um token válido
router.get('/', authenticateToken, DriverController.listAll);

module.exports = router;
