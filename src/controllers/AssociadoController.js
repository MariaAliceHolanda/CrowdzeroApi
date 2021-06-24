var Associados = require('../model/associados')
var Utilizador = require('../model/utilizadores')
var Local = require('../model/locais')
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
// Lista locais que utilizador é associado
controller.list = async (req, res) => {
    const {utilizador } = req.params;
    const data = await Associados.findAll({
      where: {utilizadoreId: utilizador},
      include: [Local]
    })
    .then(function(data){
    return data;
    })
    .catch(error => {
    return error;
    });
    res.json({success : true, data : data});
}
// Retorna Utilizadores associados a instituição
controller.getAssociados  = async (req, res) => {
  const {instituiçõeId} = req.params;
  const data = await Associados.findAll(
    { where: { instituiçõeId: instituiçõeId }},
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