var Associados = require('../model/associados')
var Instituição = require('../model/instituições')
var sequelize = require('../model/database');
var Sequelize = require('sequelize');
const controller = {}
sequelize.sync()

// Delete do associado
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



//Atualiza e devolve conquistas dos usuário
controller.Conquistas = async (req, res) => {

  // data
  const { associado, pontuacao } = req.body;
  // Update conquista
    try {

      
      
      const data = await Associados.findOne({
        where: {id: associado}
      }).then(function(data){
        return data
      }).catch(e=>{
        return e
      })

      console.log(pontuacao)
      pontuacaoConvertida = parseInt(pontuacao,10)
      const pontos = pontuacaoConvertida + data.pontuacao_user;
      console.log(pontos)
     
      await Associados.update({
        pontuacao_user: pontos,
        conquistas:  Sequelize.literal('conquistas + 1')
      }, {where: {id: associado}})

      
      const nivel = Math.ceil(pontos / 20);

    
      var divisao = 0;
      if (pontos < 100){
        divisao = 0;
      }else if (pontos >= 100 && pontos < 300){
          divisao =  1;
      }else if (pontos >= 300 && pontos < 600){
          divisao =  2;
      }else if (pontos >= 600){
          divisao = 3;
      }
     
      
      const conquista = {
      nivel: nivel,
      divisao: divisao,
      pontuacao: pontos
    }
    
     res.status(200).json({success: true,data: conquista});
    } catch (error) {
      res.status(500).json({success: false}); 
    }

    
}

//Devolve dados do associado
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

 
module.exports = controller