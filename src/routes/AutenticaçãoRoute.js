const express = require('express');
const router = express.Router();

//importar os controladores
const authGestorController = require('../controllers/AuthGestorController')
const authAdminController = require('../controllers/AuthAdminController')
const authUtilizadorController = require('../controllers/AuthUtilizadorController')

router.post('/registoAdmin',authAdminController.register);
router.post('/loginAdmin',authAdminController.login);

router.post('/registoGestor',authGestorController.register);
router.post('/loginGestor',authGestorController.login);
router.get('/getGestor',authGestorController.getGestor);

router.post('/registoUtilizador',authUtilizadorController.register);
router.post('/loginUtilizador',authUtilizadorController.login);
module.exports = router;