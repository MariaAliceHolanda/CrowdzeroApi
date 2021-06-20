var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'dealb844gkf59l',
'tvufcuqvpvgpcm',
'a9ee26e3b5788b58a37bceaf73ed195da1d20500182210762eb8903f6173ab82',
{
host: 'ec2-108-128-104-50.eu-west-1.compute.amazonaws.com',
port: '5432',
dialect: 'postgres',
dialectOptions:{
    ssl:{          
        rejectUnauthorized: false        
    }
},
logging:false
}
);
module.exports = sequelize;