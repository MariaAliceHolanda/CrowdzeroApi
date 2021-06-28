var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores')
const Locais = require('./locais')

var Instituições = sequelize.define('Instituições', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: true
},
longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: true
},
nome_instituicao: {
        type: Sequelize.STRING,
        allowNull: false
},
token_acesso: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
},
qnt_espacos: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
qnt_associados: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
estado_instituicao: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
contacto_instituicao:  Sequelize.STRING,
foto_instituicao: Sequelize.STRING,
});

Instituições.hasOne(Gestores)
Instituições.hasMany(Locais)

module.exports = Instituições