var Sequelize = require('sequelize');
var sequelize = require('./database');
var Divisões = sequelize.define('divisões', {
divisão: Sequelize.STRING
},
{
timestamps: false,
});
module.exports = Divisões