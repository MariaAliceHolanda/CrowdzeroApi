var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores');
var Relatorios = sequelize.define('relatórios', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        
},
descrição: Sequelize.INTEGER,
horaEmissão: Sequelize.DATE,
});
Gestores.hasMany(Relatorios)
Relatorios.belongsTo(Gestores)
module.exports = Relatorios