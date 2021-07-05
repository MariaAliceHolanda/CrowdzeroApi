const express = require('express');
const router = express.Router();

//importar os controladores
const instituiçãoController = require('../controllers/InstituiçãoController')
router.post('/create',instituiçãoController.create);
router.get('/get',instituiçãoController.get);
router.get('/getDadosOverview',instituiçãoController.getDadosOverview);
router.get('/statusInstituicao/:id',instituiçãoController.statusInstituicao);
router.get('/list', instituiçãoController.list)
module.exports = router;
