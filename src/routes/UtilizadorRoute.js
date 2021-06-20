const express = require('express');
const router = express.Router();

//importar os controladores
const utilizadorController = require('../controllers/UtilizadorController')
router.get('/teste',utilizadorController.teste);
module.exports = router;
