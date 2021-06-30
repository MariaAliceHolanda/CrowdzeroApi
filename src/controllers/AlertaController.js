//const { now } = require('sequelize/types/lib/utils');
var Alerta = require('../model/alertas');
var sequelize = require('../model/database');
const Locais = require('../model/locais');
var Local = require('../model/locais')
const controller = {}
sequelize.sync()

controller.list = async (req,res) => {
    // data
    const { id } = req.params;
    // create
    const data = await Alerta.findAll(
        { where: { GestoreId: id, resolvido: false}, include: [Local]}
    )
    .then(function(data){
    return data;
    })
    .catch(error =>{
        res.status(500).json({success: false, message: 'Alertas não encontrados'});
    })
    // return res
    res.status(200).json({success: true,data: data});
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
        res.status(500).json({success: false, message: 'erro'});
    })

    const local = await sequelize.query(`SELECT "LocaiId" FROM public."Alertas" where id = ${id};`,{ type: QueryTypes.SELECT });
    const localID =local[0].LocaiId;

    await Locais.update({
        estado_local: 4,
    },
    {
        where: { id: localID}
    })


    // return res
    res.status(200).json({success: true,data: data});
}


module.exports = controller