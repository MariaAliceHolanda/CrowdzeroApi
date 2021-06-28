var Relatorio = require('../model/relatórios');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

module.exports = controller