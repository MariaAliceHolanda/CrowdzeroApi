var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'dfcroupt8hphsb',
'llyvjsiwctsxtv',
'1224b7a85e7611c30578d77f0a2b6c2b75749a21f4e4c892cbcf4be220f2dfdb',
{
host: 'ec2-50-17-255-120.compute-1.amazonaws.com',
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