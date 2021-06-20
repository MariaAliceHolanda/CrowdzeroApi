var Sequelize = require('sequelize');
var sequelize = require('./database');
var divisões = require('./divisões')
var Avatar = sequelize.define('avatar', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nomeAvatar: Sequelize.STRING,
descrição: Sequelize.STRING,
nPontuação: Sequelize.INTEGER,
foto: Sequelize.INTEGER
});
Avatar.belongsTo(divisões)
module.exports = Avatar