var Sequelize = require('sequelize');
var sequelize = require('./database');
const bcrypt = require('bcrypt'); // encripta a pass a guardar na BD
const Instituições = require('./instituições');
var Gestores = sequelize.define('gestores', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
},
dataInscrição: Sequelize.DATE,
nome: Sequelize.STRING,
email: {
type: Sequelize.STRING,
allowNull: false,
unique: true
},
password:{
type: Sequelize.STRING,
allowNull: false
}
        
});


Gestores.belongsTo(Instituições)

Gestores.beforeCreate((gestores, options) => {
        return bcrypt.hash(gestores.password, 10)
        .then(hash => {
        gestores.password = hash;
        })
        .catch(err => {
        throw new Error();
        });
});
module.exports = Gestores