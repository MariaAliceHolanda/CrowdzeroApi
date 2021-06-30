const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//UTILIZAR UTILIZADORES ROUTE PARA ASSOCIADOS, NÃO USAR AQUI
//importar os controladores
const associadoController = require('../controllers/AssociadoController')

router.post('/delete', middleware.checkToken, associadoController.delete)
router.get('/get', middleware.checkToken, associadoController.get)
//router.get('/getAssociados/:id',associadoController.getAssociados)
//router.get('/list/:id',associadoController.list)
router.get('/conquista/:id',associadoController.Conquistas)
module.exports = router;
