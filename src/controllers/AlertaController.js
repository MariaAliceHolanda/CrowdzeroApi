var Alerta = require('../model/alertas');
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

controller.create = async (req,res) => {
    // data
    const divisão = "teste"
    // create
    const data = await Divisão.create({
     divisão: divisão
    })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    console.log("Erro: "+error)
    return error;
    })
    // return res
    res.status(200).json({
        success: true,
        message:" Divisão Registada",
data: data
});
}
module.exports = controller