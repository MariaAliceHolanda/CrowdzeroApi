const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
//const middleware = require('../mi')

// Importar controladores
const associacaoController = require('../controllers/AssociacaoController')

router.post('/create', associacaoController.create);
router.get('/list', middleware.checkToken, associacaoController.list);
router.get('/associacoes/:id',associacaoController.MinhasAssociacoes);
router.get('/rakingUsers',associacaoController.RankingUsers);

module.exports = router;