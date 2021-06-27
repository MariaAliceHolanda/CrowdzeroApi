var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores');
const Locais = require('./locais');
var Alertas = sequelize.define('Alertas', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
},
tipo_alerta: Sequelize.INTEGER,
resolvido: Sequelize.BOOLEAN,
});

Alertas.belongsTo(Locais)
Locais.hasMany(Alertas)
Alertas.belongsTo(Gestores)
Gestores.hasMany(Alertas)
module.exports = Alertas