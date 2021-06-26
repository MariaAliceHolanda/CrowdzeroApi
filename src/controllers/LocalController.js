var Local = require('../model/locais');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
const Gestor = require('../model/gestores')
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    // data
    const { nomelocal, fotolocal, instituicaoID} = req.body;
    // create
    const data = await Local.create({
      nomelocal: nomelocal,
      fotolocal: fotolocal,
      instituiçõeId: instituicaoID
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
/*controller.list = async (req, res) => {
    const { idInstituicao } = req.params;
    const data = await Local.findAll({
      where: {InstituiçõeId: idInstituicao},
    })
    .then(function(data){
    return data;
    })
    .catch(error => {
    return error;
    });
    res.json({success : true, data : data});
}*/

controller.list = async (req, res) => {
  if (req.body.id){
    const idGestor =  req.body.id
    const gestor = await Gestor.findOne({
      where: {id: idGestor}
    })
    .catch(e =>{
      return error
    })
  
    if (gestor){
      const idInstituicao = gestor.instituiçõeId
  
      const data = await Instituições.findOne({
        where: {id: idInstituicao}
      })
      .then(function(data){
        return data
      })
      .catch(err =>{
        return err
      })
      if (data){ 
        res.json({success: true, data: data.id, message: "Instituição encontrada com sucesso"})
      }
      else{
        res.json({success: false, message: "Erro ao encontrar a instituição"})
      }
      
     }
     else{
        res.json({
          success: false, 
          message: 'gestor não encontrado.'
        });
     }
  }else {
    res.json({
        success: false, 
        message: 'id da instituição não fornecido.'
    });
    }
}

controller.setStatusLocal = async (req,res) => {
    const { id } = req.body;
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

controller.getQuantidadeReportes = async (req,res) => {

  const { id } = req.params;
  try {
    const data = await Local.findOne({
      where: { id: id },
    })

    const qntReportes = {
      id: data.id,
      local: data.nomelocal,
      alta: data.ReporteAlto,
      média: data.ReporteMedio,
      baixa: data.ReporteBaixo

    }
    
    return res.status(200).json(qntReportes)
  } catch (error) {
    return res.status(500).json(error)
  }
}
module.exports = controller