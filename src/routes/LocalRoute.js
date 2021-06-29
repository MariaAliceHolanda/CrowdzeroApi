const express = require('express');
const router = express.Router();
const middleware = require('../middleware')

//importar os controladores
const localController = require('../controllers/LocalController')
router.post('/create',localController.create);
//router.get('/get/:id', middleware.checkToken, localController.get);
router.get('/list', middleware.checkToken, localController.list);
router.post('/delete', localController.delete);
router.get('/maisReportado',  localController.maisReportado)
//router.get('/list/:id',localController.list);
/*router.get('/statusLocal/:id',localController.setStatusLocal);
router.get('/getQuantidadeReportes/:id',localController.getQuantidadeReportes)*/
module.exports = router;
