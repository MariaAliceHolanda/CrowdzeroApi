var Sequelize = require('sequelize');
var sequelize = require('./database');
const Gestores = require('./gestores')
var Instituições = sequelize.define('instituições', {
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
},
nome: Sequelize.STRING,
contacto:  Sequelize.STRING,
email:  Sequelize.STRING,
url_website: Sequelize.STRING,
QntEspaços: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
nAssociados: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
estadoInstituiçao: {
        type: Sequelize.INTEGER,
        defaultValue: 0
},
privado:  Sequelize.BOOLEAN,
coord_x: Sequelize.FLOAT,
coord_y:  Sequelize.FLOAT,
});


module.exports = Instituições
















