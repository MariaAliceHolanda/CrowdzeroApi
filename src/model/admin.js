var Sequelize = require('sequelize');
var sequelize = require('./database');
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
var Admin = sequelize.define('Administrador', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
},
password:{
        type: Sequelize.STRING,
        allowNull: false
},
});

Admin.beforeCreate((admin, options) => {
        return bcrypt.hash(admin.password, 10)
        .then(hash => {
        admin.password = hash;
        })
        .catch(err => {
        throw new Error();
        });
});
module.exports = Admin