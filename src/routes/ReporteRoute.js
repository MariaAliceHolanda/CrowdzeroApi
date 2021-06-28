const express = require('express');
const router = express.Router();

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.post('/create',reporteController.create);
router.get('/UpdatePontuacao/:id',reporteController.UpdatePontuacao);
router.get('/getEstado/:id',reporteController.calculaEstado);
module.exports = router;
