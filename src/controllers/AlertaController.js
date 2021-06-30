//const { now } = require('sequelize/types/lib/utils');
var Alerta = require('../model/alertas');
var sequelize = require('../model/database');
var Local = require('../model/locais')
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
    // return res
    res.status(200).json({success: true,data: data});
}


module.exports = controller