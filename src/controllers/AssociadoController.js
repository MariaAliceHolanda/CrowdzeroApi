var Associados = require('../model/associados')
var Utilizador = require('../model/utilizadores')
var Instituição = require('../model/instituições')
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.delete = async (req, res) => {
  const {id} = req.body

  if (id){
     await Associados.destroy({
      where: {id: id}
    })
    .catch(e =>{
      res.json({success: false, message: 'Erro ao deletar associado.'})
    })
    res.json({success: true, message: 'Associado deletado com sucesso.'})
  }else{
    res.json({success: false, message: 'Erro ao deletar este associado.'})
  }
}

 // Lista instituições que utilizador é associado
/*controller.list = async (req, res) => {
    const {utilizador } = req.params;
    const data = await Associados.findAll({
      where: {utilizadoreId: utilizador},
      include: [Instituição]
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
    { where: { instituiçõeId: instituiçõeId }, include: [Utilizador]},
  )
  .then(function(data){
  return data;
  })
  .catch(error => {
  return error;
  });
  res.json({success : true, data : data});
}*/

/*controller.create = async (req,res) => {
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
}*/
module.exports = controller