var favoritos = require('../model/favoritos');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    // data
    const { local, utilizador } = req.body;
    // create
    const data = await favoritos.create({
      locaiId: local,
      utilizadoreId: utilizador
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
        message:" Favorito Registado",
        data: data
});
}
controller.list = async (req, res) => {
    const {utilizadoreId } = req.params;
    const data = await favoritos.findAll({
      where: {utilizadoreId: utilizadoreId},
    })
    .then(function(data){
    return data;
    })
    .catch(error => {
    return error;
    });
    res.json({success : true, data : data});
}
module.exports = controller