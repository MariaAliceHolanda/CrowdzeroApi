const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

//importar os controladores
const authGestorController = require('../controllers/AuthGestorController')
const authAssociadoController = require('../controllers/AuthAssociadoController')



router.post('/registoGestor',authGestorController.register);
router.post('/loginGestor',authGestorController.login);
//router.get('/getGestor', middleware.checkToken, authGestorController.getGestor); //Todos os gets têm que ter checagem do token

router.post('/registoUtilizador',authAssociadoController.register);
router.post('/loginUtilizador',authAssociadoController.login);
module.exports = router;