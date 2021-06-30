const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
//const middleware = require('../mi')

// Importar controladores
const associacaoController = require('../controllers/AssociacaoController')

router.post('/create', associacaoController.create);
router.post('/validate', associacaoController.validate)
router.get('/list', middleware.checkToken, associacaoController.list);
router.get('/associacoes/:id',associacaoController.MinhasAssociacoes);
router.get('/rakingUsers',associacaoController.RankingUsers);
router.delete('/deleteAssociado', middleware.checkToken, associacaoController.remover)

module.exports = router;