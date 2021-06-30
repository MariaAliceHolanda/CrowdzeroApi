const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.post('/create',reporteController.create);
router.post('/getGrafico', reporteController.getReportes)


module.exports = router;
