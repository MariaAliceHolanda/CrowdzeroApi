const express = require('express');
const router = express.Router();

//importar os controladores
const divisãoController = require('../controllers/DivisãoController')
//router.get('/teste',divisãoController.teste);
//router.post('/create',divisãoController.create);
module.exports = router;
