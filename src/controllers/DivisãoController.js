var Divisão = require('../model/divisões');
var sequelize = require('../model/database');
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
module.exports = controller