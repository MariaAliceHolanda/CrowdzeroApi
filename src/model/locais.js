var Sequelize = require('sequelize');
var sequelize = require('./database');
const Instituições = require('./instituições');
//const Reportes = require('./reportes');
var Locais = sequelize.define('Locais', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome_local: Sequelize.STRING,
foto_local: Sequelize.STRING,
descricao_local: Sequelize.STRING,
qtd_reporte_baixo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
qtd_reporte_medio: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
qtde_reporte_alto: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
estado_local: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
});

Locais.belongsTo(Instituições)
Instituições.hasMany(Locais)

module.exports = Locais