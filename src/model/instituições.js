var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores')
var Instituições = sequelize.define('Instituições', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome_instituicao: Sequelize.STRING,
contacto_instituicao:  Sequelize.STRING,
email_instituicao:  Sequelize.STRING,
foto_instituicao: Sequelize.STRING,
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
latitude: Sequelize.FLOAT,
longitude:  Sequelize.FLOAT,
});


module.exports = Instituições
















