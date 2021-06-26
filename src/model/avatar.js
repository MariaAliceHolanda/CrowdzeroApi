var Sequelize = require('sequelize');
var sequelize = require('./database');
var Avatar = sequelize.define('Avatares', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
        nome_avatar: Sequelize.STRING,
        descricao: Sequelize.STRING,
        n_pontuacao: Sequelize.INTEGER,
        foto: Sequelize.STRING,
        divisao: Sequelize.STRING
});
module.exports = Avatar