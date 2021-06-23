var Reporte = require('../model/reportes');
var Utilizador = require('../model/utilizadores')
var sequelize = require('../model/database');
//const { Sequelize } = require('sequelize/types');
//const { now } = require('sequelize/types/lib/utils');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    
    try {
        console.log("entrou")
            // data
        const {nivelReporte,localId, utilizadorId} = req.body;
        // create
        const data = await Reporte.create({
            NivelReporte: nivelReporte,
            locaiId:localId,
            utilizadoreId: utilizadorId,
        })

        if(data){
            //update reportesFeitos e Pontuação attribute
            
            Utilizador.updateAttributes(
                {reportesFeitos: Sequelize.literal('reportesFeitos + 1')},
                {Pontuação: Sequelize.literal('Pontuação + 10')},
                {where: utilizadoreId}
            )
        }

     

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};
module.exports = controller