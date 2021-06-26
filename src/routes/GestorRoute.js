const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const gestorController = require('../controllers/GestorController')
router.get('/teste',gestorController.teste);
router.post('/registarGestor',gestorController.register);

module.exports = router;
