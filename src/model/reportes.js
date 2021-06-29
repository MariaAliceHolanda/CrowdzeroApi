var Sequelize = require('sequelize');
var sequelize = require('./database');
const Locais = require('./locais');
const Associados = require('./associados')
var Reportes = sequelize.define('Reportes', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
},
nivel_reporte: {
        type: Sequelize.INTEGER,
        values: [0, 1, 2],
        allowNull: false
}
});

Reportes.belongsTo(Locais)
Locais.hasMany(Reportes)
Reportes.belongsTo(Associados)
Associados.hasMany(Reportes)
module.exports = Reportes
