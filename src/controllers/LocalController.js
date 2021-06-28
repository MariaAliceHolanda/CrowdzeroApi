var Local = require('../model/locais');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
const Gestor = require('../model/gestores')
const controller = {}
const { QueryTypes } = require('sequelize');
sequelize.sync()

controller.create = async (req,res) => {
    const { nomelocal, fotolocal, instituicaoID, descricaolocal} = req.body;
    // create
    const data = await Local.create({
      nome_local: nomelocal,
      foto_local: fotolocal,
      descricao_local: descricaolocal,
      InstituiçõeId: instituicaoID
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return res.json({sucess: false, message: 'Erro'})
        })

    const instituicao = await Instituições.findOne({
      where: {id: instituicaoID}
    })

    if (instituicao){
      const increment = await instituicao.increment('qnt_espacos',{by: 1})
    }else{
      res.json({
        success: false,
        message:"erro no registo, instituição não existente",
    }); 
    }
    // return res
    res.status(200).json({
        success: true,
        message:"Local registado com sucesso"
    });
}

controller.get = async (req,res) => {
    const { id } = req.params;
    const data = await Local.findAll({
    where: { id: id },
    })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    return error;
    })
    res.json({ success: true, data: data });
}

// Retorna todos locais de uma instituição
controller.list = async (req, res) => {
    const {idInstituicao} = req.body;

    if (idInstituicao){
      var data = await Local.findAll({
        attributes: ['id', ['nome_local', 'nome'], ['descricao_local', 'descricao'], ['estado_local', 'status']],
        group: ['Locais.id'],
        where: {InstituiçõeId: idInstituicao},
      })
      .then(function(data){
      return data;
      })
      .catch(error => {
        return error
      // res.json({success : false, message: 'Erro no servidor.'});
      });
      res.json({success : true, data : data});
    }
}

controller.delete = async (req, res) => {
  const {id} = req.body

  if (id){
    const del = await Local.destroy({
      where: {id: id}
    })
    .catch(e =>{
      res.json({success: false, message: 'Erro ao deletar este local.'})
    })
    res.json({success: true, message: 'Local deletado com sucesso.'})
  }else{
    res.json({success: false, message: 'Erro ao deletar este local.'})
  }

}

/*controller.list = async (req, res) => {
  const {id} = req.params.id
  if (id){
    var idGestor = req.body.id
    var gestor = await Gestor.findOne({
      where: {id: idGestor}
    })
    .catch(error =>{
        return error;
    })
    res.json({success: true, message:'gestor encontrado', data:gestor});
  }else{
    res.json({success: false, message:'gestor não encontrado'});
  }
}*/


/*controller.setStatusLocal = async (req,res) => {
    const { id } = req.body;
    const data = await Local.findAll({
    where: { id: id },
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
    return error;
    })

    const baixo = data.ReporteBaixo;
    const medio = data.ReporteMedio;
    const alto = data.ReporteAlto;
    const status = 0;
    if (baixo >= alto && baixo >= medio)
     status = 1
    else if(medio >= baixo && medio >= alto)
      status = 2
    else
      status = 3

      await Local.update({ EstadoLocal: status }, {
        where: {
          id : id
        }
      });
       
    res.json({ success: true, data: status });
}*/

/*controller.getQuantidadeReportes = async (req,res) => {

  const { id } = req.params;
  try {
    const data = await Local.findOne({
      where: { id: id },
    })

    const qntReportes = {
      id: data.id,
      local: data.nomelocal,
      alta: data.ReporteAlto,
      média: data.ReporteMedio,
      baixa: data.ReporteBaixo

    }
    
    return res.status(200).json(qntReportes)
  } catch (error) {
    return res.status(500).json(error)
  }
}*/
module.exports = controller