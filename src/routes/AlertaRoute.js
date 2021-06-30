const express = require('express');
const router = express.Router();

//importar os controladores
const alertaController = require('../controllers/AlertaController')
router.get('/list/:id',alertaController.list);
router.get('/checkAlerta/:id',alertaController.checkAlerta);
module.exports = router;
