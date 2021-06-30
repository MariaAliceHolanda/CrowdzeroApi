var Local = require('../model/locais');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
const Gestor = require('../model/gestores')
const controller = {}
const { QueryTypes } = require('sequelize');
sequelize.sync()

controller.create = async (req,res) => {
    const { nomelocal, instituicaoID, descricaolocal} = req.body;
    // create

    if (nomelocal && instituicaoID && descricaolocal){
      const data = await Local.create({
        nome_local: nomelocal,
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
    }else{
      res.json({success: false, message: 'Erro ao registar local'})
    }
   
}

controller.get = async (req,res) => {
    const { id } = req.query;
    const data = await Local.findOne({
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
    const {id} = req.query;

    if (id){
      var data = await Local.findAll({
        attributes: ['id', ['nome_local', 'nome'], ['descricao_local', 'descricao'], ['estado_local', 'status']],
        group: ['Locais.id'],
        where: {InstituiçõeId: id},
      })
      .then(function(data){
      return data;
      })
      .catch(error => {
        return error
      });
      res.json({success : true, data : data});
    }else{
      res.json({success: false, message: 'ID não fornecido'}) 
    }
}

controller.delete = async (req, res) => {
  const {id} = req.body

  if (id){
    const local = await Local.findOne({
      where: {id: id}
    })

    if (local){
      const instituicao = await Instituições.findOne({
        where: {id: local.InstituiçõeId}
      })

      await local.destroy()
      .catch(e =>{
        res.json({success: false, message: 'Erro ao deletar este local.'})
      })

      instituicao.decrement(['qnt_espacos'], {by: 1})
      res.json({success: true, message: 'Local deletado com sucesso.'})
    }

  }else{
    res.json({success: false, message: 'Erro ao deletar este local.'})
  }

}

controller.maisReportado = async (req, res) => {
  const {id} = req.query

  if (id){
    var local = await Local.findOne({
      where: {InstituiçõeId: id}
    })
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