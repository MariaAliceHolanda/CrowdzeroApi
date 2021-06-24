const express = require('express')
const router = express.Router();

const overviewController = require('../controllers/overviewController.js')
router.get('/getDadosOverview/:id', overviewController.getOverviewData)
module.exports = router;
