const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const gestorController = require('../controllers/GestorController')
router.get('/get', middleware.checkToken, gestorController.get); //Todos os gets têm que ter checagem do token
router.get('/list', gestorController.list)
router.post('/update', gestorController.update)
router.get('/instituicao', gestorController.instituicao)
router.post('/alterarPassword', gestorController.alterarPass)
router.delete('/delete', gestorController.delete)

module.exports = router;
