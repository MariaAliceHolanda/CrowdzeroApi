const express = require('express');
const router = express.Router();

//importar os controladores
const favoritosController = require('../controllers/favoritosController')
router.post('/create',favoritosController.create)
router.get('/list/:id',favoritosController.list)
module.exports = router;
