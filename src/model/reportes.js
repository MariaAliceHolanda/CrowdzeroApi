var Sequelize = require('sequelize');
var sequelize = require('./database');
const Locais = require('./locais');
const Utilizadores = require('./utilizadores')
var Reportes = sequelize.define('reportes', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
},
NivelReporte: Sequelize.INTEGER,
HoraReporte: Sequelize.DATE,
});
Reportes.belongsTo(Locais)
Locais.hasMany(Reportes)
Reportes.belongsTo(Utilizadores)
Utilizadores.hasMany(Reportes)
module.exports = Reportes
