const express = require('express');
const router = express.Router();

//importar os controladores
const gestorController = require('../controllers/GestorController')
router.get('/teste',gestorController.teste);
module.exports = router;
