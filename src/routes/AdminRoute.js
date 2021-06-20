const express = require('express');
const router = express.Router();

//importar os controladores
const usuárioController = require('../controllers/AdminController')
router.get('/teste',usuárioController.teste);
module.exports = router;
