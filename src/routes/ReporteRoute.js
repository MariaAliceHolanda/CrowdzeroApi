const express = require('express');
const router = express.Router();

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.post('/create',reporteController.create);
router.post('UpdatePontuacao',reporteController.UpdatePontuacao);
module.exports = router;
