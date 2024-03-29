        var Sequelize = require('sequelize');
var sequelize = require('./database');
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
var Gestores = sequelize.define('Gestores', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
nome: {
        type: Sequelize.STRING,
        allowNull: false
},
foto: Sequelize.STRING,
email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        },
password:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
}
});

Gestores.beforeCreate((gestores, options) => {
        return bcrypt.hash(gestores.password, 10)
        .then(hash => {
        gestores.password = hash;
        })
        .catch(err => {
               throw new Error()
        });
});
module.exports = Gestores