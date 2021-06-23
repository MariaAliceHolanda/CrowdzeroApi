const express = require('express');
const router = express.Router();

//importar os controladores
const localController = require('../controllers/LocalController')
router.post('/create',localController.create);
router.get('/get/:id',localController.get);
router.get('/list/:id',localController.list);
router.get('/statusLocal/:id',localController.setStatusLocal);
router.get('/getQuantidadeReportes/:id'/localController.getQuantidadeReportes)
module.exports = router;
