var Sequelize = require('sequelize');
var sequelize = require('./database');
const Instituições = require('./instituições');
//const Reportes = require('./reportes');
var Locais = sequelize.define('locais', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nomelocal: Sequelize.STRING,
fotoLocal: Sequelize.STRING,
ReporteBaixo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
ReporteMedio: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
ReporteAlto: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
EstadoLocal: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
});

Locais.belongsTo(Instituições)
Instituições.hasMany(Locais)

module.exports = Locais