var Sequelize = require('sequelize');
var sequelize = require('./database');
const utilizador = require('./utilizadores');
const Locais = require('./locais');
var favoritos = sequelize.define('favoritos', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
},
});

Locais.hasMany(favoritos,{foreignKey:{ allowNull: false, type: Sequelize.INTEGER}});
favoritos.belongsTo(Locais);
utilizador.hasMany(favoritos,{foreignKey:{ allowNull: false, type: Sequelize.INTEGER}});
favoritos.belongsTo(utilizador)

module.exports = favoritos