
// MODELO ANTIGO
/*
var Sequelize = require('sequelize');
var sequelize = require('./database');
//const Reportes = require('./reportes');
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
var Utilizadores = sequelize.define('Utilizadores', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome_user: Sequelize.STRING,
email_user: {
type: Sequelize.STRING,
allowNull: false,
unique: true
},
password_user:{
type: Sequelize.STRING,
allowNull: false
},
pontuacao_user: {
type:Sequelize.INTEGER,
defaultValue: 0
},
qnt_reportes:{
 type: Sequelize.INTEGER,
 defaultValue: 0
},
data_inscricao: Sequelize.DATE
});

Utilizadores.beforeCreate((utilizadores, options) => {
        return bcrypt.hash(utilizadores.password, 10)
        .then(hash => {
        utilizadores.password = hash;
        })
        .catch(err => {
        throw new Error();
        });
});
*/