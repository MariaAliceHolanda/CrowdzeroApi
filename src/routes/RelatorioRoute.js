const express = require('express');
const router = express.Router();

//importar os controladores
const relatorioController = require('../controllers/RelatorioController')
router.get('/teste',relatorioController.teste);
module.exports = router;
