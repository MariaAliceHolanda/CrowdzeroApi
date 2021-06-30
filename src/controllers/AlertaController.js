//const { now } = require('sequelize/types/lib/utils');
var Alerta = require('../model/alertas');
var sequelize = require('../model/database');
var Local = require('../model/locais')
const { QueryTypes } = require('sequelize');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    // data
    const {IDLOCAL, IDGESTOR, TIPOALERTA, HORAALERTA }= req.body;
    // create
    const data = await Alerta.create({
        LocaiId: IDLOCAL,
        gestoreId: IDGESTOR,
        TipoAlerta: TIPOALERTA,
        HORAALERTA: now()
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
        message:"Alerta Registado",
data: data
});
}

controller.list = async (req,res) => {
    // data
    const { id } = req.query;
    // create

    if (id){
        var query = `
        SELECT "Alertas".id, 
        CASE 
         WHEN estado_local = 0 THEN 'Sem Reportes'
         WHEN estado_local = 1 THEN 'Baixa Ocupação'
         WHEN estado_local = 2 THEN 'Média Ocupação'
         WHEN estado_local = 3 THEN 'Alta Ocupação'
         ELSE 'Sem Status' END
        AS status,
        EXTRACT(HOUR FROM "Alertas"."createdAt") AS horas,
        EXTRACT(MINUTE FROM "Alertas"."createdAt") AS minutos,
        EXTRACT(DAY FROM "Alertas"."createdAt") AS dia,
        EXTRACT (MONTH FROM "Alertas"."createdAt") AS mes,
        CASE 
            WHEN tipo_alerta = 1 THEN 'Desinfeção'
            ELSE 'Sem Status' END
        AS tipoAlerta,
        nome_local AS local
        FROM "Alertas"
        INNER JOIN "Locais"
        ON "Locais".id="Alertas"."LocaiId"
        LIMIT 5
        `
    }
    const data = await sequelize.query(query,{ type: QueryTypes.SELECT })
    .then(function(data){
    return data;
    })
    .catch(error =>{
        res.json({success: false, message: 'Alertas não encontrados'});
    })
    // return res
    res.status(200).json({success: true, data: data});
}

controller.checkAlerta = async (req,res) => {
    // data
    const { id } = req.params;
    // create
    const data = await Alerta.update({
        resolvido: true
       },
       {
       where: { id: id}
     })
    .then(function(data){
    return data;
    })
    .catch(error =>{
        res.status(500).json({success: false, message: 'Alerta Resolvido'});
    })
    // return res
    res.status(200).json({success: true,data: data});
}


module.exports = controller