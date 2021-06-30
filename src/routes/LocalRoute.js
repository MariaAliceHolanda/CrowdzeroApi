const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const localController = require('../controllers/LocalController')
router.post('/create',localController.create);
router.get('/list', middleware.checkToken, localController.list);
router.post('/delete', localController.delete);
router.get('/locaisMaisReporte', middleware.checkToken, localController.locaisMaisReportados)
router.get('/get', middleware.checkToken, localController.get)

module.exports = router;
