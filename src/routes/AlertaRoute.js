const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const alertaController = require('../controllers/AlertaController')
router.get('/list', middleware.checkToken, alertaController.list);
router.post('/checkAlerta',alertaController.checkAlerta);
module.exports = router;
