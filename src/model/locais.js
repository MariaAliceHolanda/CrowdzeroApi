var Sequelize = require('sequelize');
var sequelize = require('./database');
var Locais = sequelize.define('Locais', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome_local: {
        type: Sequelize.STRING,
        allowNull: false,
},
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
        defaultValue: 0,
        values: [0, 1, 2, 3, 4] 
},
ultimo_reporte: {
        type: Sequelize.DATE
},
descricao_local: Sequelize.STRING,
});

module.exports = Locais