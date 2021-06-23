var Reporte = require('../model/reportes');
var Utilizador = require('../model/utilizadores')
var sequelize = require('../model/database');
//const { now } = require('sequelize/types/lib/utils');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    
    try {
            // data
        const {nivelReporte,locaiId, utilizadoreId} = req.body;
        // create
        const data = await Reporte.create({
            NivelReporte: nivelReporte,
            locaiId:locaiId,
            utilizadoreId: utilizadoreId,
            //HoraReporte: now()
        })

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};
module.exports = controller