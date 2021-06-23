const express = require('express');
const router = express.Router();

//importar os controladores
const reporteController = require('../controllers/ReporteController')
router.post('/create',reporteController.create);
module.exports = router;
