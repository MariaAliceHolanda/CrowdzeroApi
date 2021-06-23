const express = require('express');
const router = express.Router();

//importar os controladores
const associadoController = require('../controllers/AssociadoController')

router.get('/getAssociados/:id',associadoController.getAssociados)
module.exports = router;
