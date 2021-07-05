var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'dtp84f23f6kd4',
'qnrpescebzzgfm',
'3f64153bc87af3a7a6972704d1c0d8139a4ae1891b0d593aa04e73909ab18c43',
{
host: 'ec2-18-235-4-83.compute-1.amazonaws.com',
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