const express = require('express');
const router = express.Router();

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.get('/teste',reporteController.teste);
module.exports = router;
