const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const gestorController = require('../controllers/GestorController')
router.get('/get', middleware.checkToken, gestorController.get); //Todos os gets têm que ter checagem do token

module.exports = router;
