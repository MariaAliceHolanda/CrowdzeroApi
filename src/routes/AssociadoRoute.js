const express = require('express');
const router = express.Router();

//UTILIZAR UTILIZADORES ROUTE PARA ASSOCIADOS, NÃO USAR AQUI
//importar os controladores
const associadoController = require('../controllers/AssociadoController')

router.get('/getAssociados/:id',associadoController.getAssociados)
router.get('/list/:id',associadoController.list)
module.exports = router;
