const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//UTILIZAR UTILIZADORES ROUTE PARA ASSOCIADOS, NÃO USAR AQUI
//importar os controladores
const associadoController = require('../controllers/AssociadoController')

<<<<<<< HEAD
router.post('/delete', middleware.checkToken, associadoController.delete)
=======
//router.get('/getAssociados/:id',associadoController.getAssociados)
>>>>>>> f112f60af5dee09c7a4d059d05560cfa63f29ec2
//router.get('/list/:id',associadoController.list)
module.exports = router;
