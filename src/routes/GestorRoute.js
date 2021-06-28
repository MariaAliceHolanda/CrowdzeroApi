const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const gestorController = require('../controllers/GestorController')
router.post('/get', gestorController.get); //Todos os gets têm que ter checagem do token

module.exports = router;
