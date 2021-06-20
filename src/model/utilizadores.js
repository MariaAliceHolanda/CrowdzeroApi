var Sequelize = require('sequelize');
const Avatar = require('./avatar');
var sequelize = require('./database');
//const Reportes = require('./reportes');
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
var Utilizadores = sequelize.define('utilizadores', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
},
nome: Sequelize.STRING,
email: {
type: Sequelize.STRING,
allowNull: false,
unique: true
},
password:{
type: Sequelize.STRING,
allowNull: false
},
Pontuação: {
type:Sequelize.INTEGER,
defaultValue: 0
},
reportesFeitos:{
 type: Sequelize.INTEGER,
 defaultValue: 0
},
dataInscrição: Sequelize.DATE
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

Avatar.hasMany(Utilizadores)
Utilizadores.belongsTo(Avatar)

module.exports = Utilizadores