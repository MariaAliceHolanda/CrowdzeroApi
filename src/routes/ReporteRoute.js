const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.post('/create',reporteController.create);
router.get('/UpdatePontuacao/:id',reporteController.UpdatePontuacao);
//router.get('/getEstado/:id',reporteController.calculaEstado);

// ALTERAÇÕES --- MARIA EDUARDA
router.get('/getGrafico', reporteController.getReportes)
module.exports = router;
