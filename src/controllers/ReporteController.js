var Reporte = require('../model/reportes');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.teste = (req,res) => {
    const data = {
    name: "Nuno Costa",
    age: 42,
    city: 'Viseu'
    }
    console.log("Envio de dados do Controlador EMPLOYEE.");
    res.json(data);
};
module.exports = controller