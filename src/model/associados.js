var Sequelize = require('sequelize');
var sequelize = require('./database');
const Instituições = require('./instituições');
const Associações = require('./associacao')
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
var Associados = sequelize.define('Associados', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome_user: {
        type: Sequelize.STRING,
        allowNull: false
},
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
conquistas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},        
qnt_reportes:{
        type: Sequelize.INTEGER,
        defaultValue: 0
},
});

Associados.beforeCreate((utilizadores, options) => {
        return bcrypt.hash(utilizadores.password_user, 10)
        .then(hash => {
        utilizadores.password_user = hash;
        })
        .catch(err => {
                console.log(err)
        });
});
Associados.belongsToMany(Instituições, {through: Associações});
Instituições.belongsToMany(Associados, {through: Associações})

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