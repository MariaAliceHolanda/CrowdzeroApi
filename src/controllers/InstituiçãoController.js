var Instituição = require('../model/instituições');
var sequelize = require('../model/database');
const Instituições = require('../model/instituições');
const Locais = require('../model/locais');

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
    const { id } = req.query;
    const data = await Instituição.findOne({
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

controller.statusInstituicao = async (req,res) => {
    const { id } = req.params;

    const baixo = Locais.count({ where: {
        InstituiçõeId: id,
        estado_local: 1
    }} );
    const medio = Locais.count({ where: {
        InstituiçõeId: id,
        estado_local: 2
    }} )
    const alto = Locais.count({ where: {
        InstituiçõeId: id,
        estado_local: 3
    }} )

    console.log(baixo);
    console.medio(medio);
    console.log(alto);

    const estado = 0;

    if(baixo > medio && baixo > alto)
      estado = 1;
    else if(medio >= baixo && medio > alto)
      estado = 2;
    else
      estado = 3;

    const status = await Instituições.update({
       estado_instituicao: estado,
    },
    {
    where: { id: id}
    })
    .then( function(status){
    return status;
    })
    .catch(error => {
    return error;
    })

    res.json({ success: true, data: status });
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