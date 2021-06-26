var Gestor = require('../model/gestores');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.teste = (req,res) => {
    const data = {
    name: "Nuno Costa",
    age: 42,
    city: 'Viseu'
    }
    console.log("Envio de dados do Controlador EMPLOYEE.");
    res.json(data);
};

controller.register = async (req,res) => {
    const {nome, email, password, nome_empresa, contacto_empresa, email_empresa, lat, lon} = req.body;

    const instituicao = await Instituicao.create({
        nome: nome_empresa,
        contacto: contacto_empresa, 
        email: email_empresa,
        coord_x: lat,
        coord_y: lon
    }).catch(e =>{
        console.log("Erro "+ e)
        return e
    })

    if(instituicao){
        const data = await Gestor.create({
            nome:nome,
            email: email,
            password: password,
            instituiçõeId: instituicao.id
        })
        .then(function(data){
            return data;
        })
        .catch(error =>{
            console.log("Erro: "+error);
            return error;
        })
        res.status(200).json({
            success: true,
            message:"Registado",
            data: data
        });
    }
}
module.exports = controller