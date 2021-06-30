var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores');
const Locais = require('./locais');
var Alertas = sequelize.define('Alertas', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
tipo_alerta: {
        type: Sequelize.INTEGER,
        values: [0, 1, 2],
        allowNull: false
},
resolvido: Sequelize.BOOLEAN,
});

Alertas.belongsTo(Locais)
Locais.hasMany(Alertas)
Alertas.belongsTo(Gestores)
Gestores.hasMany(Alertas)
module.exports = Alertas