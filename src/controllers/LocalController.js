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
      const query = `
      SELECT id, nome_local as nome, descricao_local 
      AS descricao, qtde_reporte_alto, qtd_reporte_baixo, qtd_reporte_medio, estado_local as status
        FROM "Locais"
        WHERE "Locais"."InstituiçõeId"=${id}
      `
      var data = await sequelize.query(query, {type: QueryTypes.SELECT})
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

controller.locaisMaisReportados = async (req, res) =>{
  const {id} = req.query

  if (id){
    const query = `
    select nome_local as id, nome_local as label, ("Locais".qtd_reporte_baixo +
    "Locais".qtde_reporte_alto + "Locais".qtd_reporte_medio) AS value
    from "Locais"
    WHERE "Locais"."InstituiçõeId"=${id}
    ORDER BY value DESC
    LIMIT 3
    `
    const data = await sequelize.query(query,{ type: QueryTypes.SELECT })
    .then(data=>{
      return data
    }).catch(e=>{
      return e
    })

    if (data){
      res.json({success: true, data: data})
    }else{
      res.json({success: false})
    }
  }

}


module.exports = controller