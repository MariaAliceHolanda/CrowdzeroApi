var Alerta = require('../model/alertas');
var sequelize = require('../model/database');
var Local = require('../model/locais')
const controller = {}
sequelize.sync()

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

controller.getAlertas = async (req,res) => {
    // data
    const { id } = req.params;
    // create
    const data = await Alerta.findAll(
        { where: { gestoreId: id }, include: [Local]}
    )
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
        data: data
});
}
module.exports = controller