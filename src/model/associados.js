var Sequelize = require('sequelize');
var sequelize = require('./database');
const Instituições = require('./instituições');
var Associados = sequelize.define('Associados', {
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
divisao:  {
        type: Sequelize.INTEGER,
        defaultValue: 0
}
});

Associados.beforeCreate((utilizadores, options) => {
        return bcrypt.hash(utilizadores.password, 10)
        .then(hash => {
        utilizadores.password = hash;
        })
        .catch(err => {
        throw new Error();
        });
});
Instituições.hasMany(Associados);
Associados.hasMany(Instituições);

module.exports = Associados

// MODELO ANTIGO

/*
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
Associados.belongsTo(utilizador) */