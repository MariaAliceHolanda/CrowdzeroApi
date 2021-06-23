var Instituição = require('../model/instituições');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
Local = require('../model/locais')

const controller = {}
sequelize.sync()


controller.create = async (req,res) => {
    // data
    const { nome, contacto,  email, url, privado, coord_x,coord_y
    } = req.body;
    // create
    const data = await Instituição.create({
    nome: nome,
    contacto:contacto,
    email: email,
    url_website: url,
    privado: privado,
    coord_x : coord_x,
    coord_y: coord_y
    })
    .then(function(data){
    return data;
    console.log()
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
    const data = await Instituição.findAll({
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

controller.getDadosOverview =  async (req,res) => {
    const { id } = req.params;
    const data = await Instituição.findOne({
    where: { id: id },
    })

    const { count, rows } = await Local.findAndCountAll({
        where: {
          InstituiçõeId: id,
          EstadoLocal: 1
        },
      });
    try {
        
        const dados = {
           "Associados":{
               id: 1,
               descricao: "Associados",
               quantidade: data.nAssociados,
               cor: "green"

           },
           "AltaOcupação":{
            id: 2,
            descricao: "AltaOcupação",
            quantidade: data.nAssociados,
            cor: "red"
           },
           "MediaOcupação":{
            id: 3,
            descricao: "MediaOcupação",
            quantidade: data.nAssociados,
            cor: "yellow"
           },
           "BaixaOcupação":{
            id: 4,
            descricao: "BaixaOcupação",
            quantidade: count,
            cor: "blue"
           },
           "EspaçosCriados":{
            id: 5,
            descricao: "EspaçosCriados",
            quantidade: data.QntEspaços,
            cor: "purple"
           }

        }
        return res.status(200).json(dados)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = controller