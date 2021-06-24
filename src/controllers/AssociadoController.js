var Associados = require('../model/associados')
var Utilizador = require('../model/utilizadores')
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    // data
    const { instituicao, utilizador } = req.body;
    // create
    const data = await Associados.create({
      instituiçõeId: instituicao,
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
        message:" Associação Registada",
        data: data
});
}
controller.list = async (req, res) => {
    const {utilizador } = req.params;
    const data = await Associados.findAll({
      where: {utilizadoreId: utilizador},
    })
    .then(function(data){
    return data;
    })
    .catch(error => {
    return error;
    });
    res.json({success : true, data : data});
}

controller.getAssociados  = async (req, res) => {
  const {instituiçõeId} = req.params;
  const data = await Associados.findAll(
    { where: { instituiçõeId: instituiçõeId } , 
    include: [ Utilizador]},
  )
  .then(function(data){
  return data;
  })
  .catch(error => {
  return error;
  });
  res.json({success : true, data : data});
}
module.exports = controller