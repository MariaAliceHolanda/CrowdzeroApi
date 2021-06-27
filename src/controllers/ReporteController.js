var Reporte = require('../model/reportes');
var Sequelize = require('sequelize');
var sequelize = require('../model/database');
const Associados = require('../model/associados');
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
        attributes:{include :['pontuacao_user', 'qnt_reportes']},
        where: { id: id}
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
            where:{nivel_reporte: 1, LocaiId: id}
        })
        const reporteMedio = await Reporte.count({
            where:{nivel_reporte: 2, LocaiId: id}
        })
        const reporteAlto = await Reporte.count({
            where:{nivel_reporte: 3, LocaiId: id}
        })

        const data = {
            baixo: reporteBaixo,
            medio:reporteMedio,
            alto: reporteAlto
        }

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};

module.exports = controller