const express = require('express');
const router = express.Router();

//importar os controladores
const instituiçãoController = require('../controllers/InstituiçãoController')
router.post('/create',instituiçãoController.create);
router.get('/get/:id',instituiçãoController.get);
module.exports = router;
