var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores');
var Relatorios = sequelize.define('Relatórios', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        
},
descricao: Sequelize.INTEGER,
hora_emissao: Sequelize.DATE,
});
Gestores.hasMany(Relatorios)
Relatorios.belongsTo(Gestores)
module.exports = Relatorios