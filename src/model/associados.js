var Sequelize = require('sequelize');
var sequelize = require('./database');
const utilizador = require('./utilizadores');
const Instituições = require('./instituições');
var Associados = sequelize.define('Associados', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
});
Instituições.hasMany(Associados);
Associados.belongsTo(Instituições);
utilizador.hasMany(Associados);
Associados.belongsTo(utilizador)

module.exports = Associados