var Local = require('../model/locais');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    // data
    const { nomelocal,fotolocal , instituiçõesId
    } = req.body;
    // create
    const data = await Local.create({
    nomelocal: nomelocal,
    fotolocal: fotolocal,
    instituiçõeId: instituiçõesId
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
message:"Registado",
data: data
});
}

controller.get = async (req,res) => {
    const { id } = req.params;
    const data = await Local.findAll({
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
    const { idInstituicao } = req.params;
    const data = await Local.findAll({
      where: {instituiçõeId: idInstituicao},
    })
    .then(function(data){
    return data;
    })
    .catch(error => {
    return error;
    });
    res.json({success : true, data : data});
}

controller.setStatusLocal = async (req,res) => {
    const { id } = req.params;
    const data = await Local.findAll({
    where: { id: id },
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
    return error;
    })

    const baixo = data.ReporteBaixo;
    const medio = data.ReporteMedio;
    const alto = data.ReporteAlto;
    const status = 0;
    if (baixo >= alto && baixo >= medio)
     status = 1
    else if(medio >= baixo && medio >= alto)
      status = 2
    else
      status = 3

      await Local.update({ EstadoLocal: status }, {
        where: {
          id : id
        }
      });
       
    res.json({ success: true, data: status });
}
module.exports = controller