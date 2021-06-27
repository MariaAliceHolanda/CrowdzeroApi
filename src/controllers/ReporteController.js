var Reporte = require('../model/reportes');
var Sequelize = require('sequelize');
var sequelize = require('../model/database');
const Associados = require('../model/associados');
const Locais = require('../model/locais');
//const { Sequelize } = require('sequelize/types');
//const { now } = require('sequelize/types/lib/utils');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    
    try {

            // data
        const {nivelReporte,localId, associadoId} = req.body;
        // create
        const data = await Reporte.create({
            nivel_reporte: nivelReporte,
            LocaiId:localId,
            AssociadoId: associadoId,
        })

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};


controller.UpdatePontuacao = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // Update pontuação/ reportes feitos
    const data = await Associados.update({
        pontuacao_user:  Sequelize.literal('pontuacao_user + 10'),
        qnt_reportes:  Sequelize.literal('qnt_reportes + 1')
       },
       {
       where: { id: id}
    })
    .then( function(data){
    return data;
    })
    .catch(error => {
    return error;
    })
      
    const dados = await Associados.findOne({
        attributes:{include :['pontuacao_user', 'qnt_reportes'],
        exclude: ['id','nome_user','email_user','password_user','divisao','createdAt','updatedAt']
     },
        where: { id : id } 
    })
    .then( function(dados){
    return dados;
    })
    .catch(error => {
    return error;
    })
    res.json({success:true, data:dados, message:"Updated successful"});
}

controller.calculaEstado = async (req,res) => {
    const { id } = req.params;
    try {

        const reporteBaixo = await Reporte.count({
            where: { 
                $and : [
                    Sequelize.where(Sequelize.fn('datediff', sequelize.fn("NOW") , sequelize.col('createdAt')), {
                        [Op.lt]: 60,               
                    }) ,
                    {nivel_reporte: 1, LocaiId: id}
                ]
            } 
            
        })
        const reporteMedio = await Reporte.count({
            where: { 
                $and : [
                    Sequelize.where(Sequelize.fn('datediff', sequelize.fn("NOW") , sequelize.col('createdAt')), {
                        [Op.lt]: 60,               
                    }) ,
                    {nivel_reporte: 2, LocaiId: id}
                ]
            } 
        })
        const reporteAlto = await Reporte.count({
            where: { 
                $and : [
                    Sequelize.where(Sequelize.fn('datediff', sequelize.fn("NOW") , sequelize.col('createdAt')), {
                        [Op.lt]: 60,               
                    }) ,
                    {nivel_reporte: 3, LocaiId: id}
                ]
            } 
        })
        
        var estado = 0
        if(reporteBaixo >= reporteMedio && reporteBaixo > reporteAlto)
           estado = 1
        else if(reporteMedio >= reporteBaixo && reporteMedio > reporteAlto)
           estado = 2
        else if(reporteAlto >= reporteMedio && reporteAlto > reporteBaixo)
           estado = 3
        else
           estado = 1

        const data = await Locais.update({
          qtd_reporte_baixo: reporteBaixo,
          qtd_reporte_medio: reporteMedio,
          qtd_reporte_alto: reporteAlto,
          estado_local: estado
        },
        {
        where: { id: id}
        })
        .then( function(data){
        return data;
        })
        .catch(error => {
        return error;
        })

        const dados = {
            baixo: reporteBaixo,
            medio:reporteMedio,
            alto: reporteAlto,
            estadoLocal: estado
        }

        return res.status(200).json(dados)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};

module.exports = controller