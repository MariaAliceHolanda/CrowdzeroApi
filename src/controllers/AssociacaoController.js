const Instituicao = require('../model/instituições')
const Associacao = require('../model/associacao')
const Associado = require('../model/associados')
const sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

controllers.create = async (req, res) => {
    const {idUtilizador, idInstituicao} = req.body

    if (idUtilizador && idInstituicao){
        var data = await Associacao.create({
            AssociadoId: idUtilizador,
            InstituiçõeId: idInstituicao 
        }).then(function(data){
            return data
        }).catch(err =>{
            res.json({success: false, message: err})
        })
        res.status(200).json({
            success: true,
            messagem: 'Associação realizada',
            data: data
        })
    }else{
        res.json({success: false, message:'Campos em branco, verifique novamente.'});
    }
}

module.exports = controllers;