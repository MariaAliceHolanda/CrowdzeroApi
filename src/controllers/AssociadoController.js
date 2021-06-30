var Associados = require('../model/associados')
var Instituição = require('../model/instituições')
var sequelize = require('../model/database');
var Sequelize = require('sequelize');
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

function getDivisao(pontos){
  console.log('get divisao')
  if (pontos < 100){
     return 0;
  }else if (pontos > 100 && pontos < 300){
     return 1;
  }else if (pontos > 400 && pontos < 600){
      return 2;
  }else if (pontos > 700){
      return 3;
  }
  return 0;
}


controller.Conquistas = async (req, res) => {

  // data
  const { associado, pontuacao } = req.body;
  // Update conquista
    try {

      //Associados.increment('pontuacao_user', { by: pontuacao, where: { id: associado }});
      
      const data = await Associados.findOne({
        where: {id: associado}
      }).then(function(data){
        return data
      }).catch(e=>{
        return e
      })
      const pontos = pontuacao + data.pontuacao_user;
     
      await Associados.update({
        pontuacao_user: pontos
      }, {where: {id: associado}})

      
      const divisao = Math.ceil(pontos / 20);
      
      var nivel = 0;
      if (pontos < 100){
        nivel = 0;
      }else if (pontos >= 100 && pontos < 300){
          nivel =  1;
      }else if (pontos >= 300 && pontos < 600){
          nivel =  2;
      }else if (pontos >= 600){
          nivel = 3;
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