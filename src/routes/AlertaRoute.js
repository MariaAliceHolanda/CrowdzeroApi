const express = require('express');
const router = express.Router();



//importar os controladores
const alertaController = require('../controllers/AlertaController')
router.get('/teste',alertaController.teste);
module.exports = router;
