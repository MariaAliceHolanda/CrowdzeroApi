const express = require('express');
const router = express.Router();

//importar os controladores
const relatorioController = require('../controllers/RelatorioController')
router.get('/create', relatorioController.create);
module.exports = router;
