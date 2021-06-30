var Associados = require('../model/associados')
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

controller.get = async (req, res) => {
  const {id} = req.query

  if (id){
    const data = await Associados.findOne({
      where: {id: id}
    }).then(function(data){
      return data
    }).catch(e=>{
      return e
    })
    res.status(200).json({success: true, message: 'Sucesso', data: data})
  }else{
    res.json({success: false, message: 'Campos em Branco'})
  }

}

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