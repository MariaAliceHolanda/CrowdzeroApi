var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores');
const Locais = require('./locais');
var Alertas = sequelize.define('alertas', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        
},
tipoAlerta: Sequelize.INTEGER,
horaAlerta: Sequelize.DATE,
resolvido: Sequelize.BOOLEAN,
});
Alertas.belongsTo(Locais)
Locais.hasMany(Alertas)
Alertas.belongsTo(Gestores)
Gestores.hasMany(Alertas)
module.exports = Alertas