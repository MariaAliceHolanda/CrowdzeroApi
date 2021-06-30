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
    const { id } = req.query;
    const data = await Instituição.findOne({
    where: { id: id },
    })

    var baixa = 0
    var alta = 0
    var media = 0

     await Local.findAndCountAll({
        where: {
          InstituiçõeId: id,
          estado_local: 1
        },
      }).then(qtdBaixa =>{
          baixa = qtdBaixa.count
      })

      await Local.findAndCountAll({
        where: {
          InstituiçõeId: id,
          estado_local: 3
        },
      }).then(alta=>{
          alta = alta.count
      })

      await Local.findAndCountAll({
        where: {
          InstituiçõeId: id,
          estado_local: 2
        },
      }).then(media =>{
          media = media.count
      })

      console.log(media)
    try {
        
        const dados = [
           {
               id: 1,
               descricao: "Associados",
               quantidade: data.qnt_associados,
               cor: "green"
           },
           {
            id: 2,
            descricao: "Alta Ocupação",
            quantidade: alta,
            cor: "red"
           },
           {
            id: 3,
            descricao: "Média Ocupação",
            quantidade: media,
            cor: "yellow"
           },
           {
            id: 4,
            descricao: "Baixa Ocupação",
            quantidade: baixa,
            cor: "light-green"
           },
           {
            id: 5,
            descricao: "Espaços Criados",
            quantidade: data.qnt_espacos,
            cor: "purple"
           }
        ]
        return res.status(200).json({success: true, data: dados})
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = controller