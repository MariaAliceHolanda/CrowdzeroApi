const Instituicao = require('../model/instituições')
const Associacao = require('../model/associacao')
const Associado = require('../model/associados')
const sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

controllers.create = async (req, res) => {
    const {token_access, id} = req.body

    if (token_access && id){
        var instituicao = await Instituicao.findOne({
            where: {id: id}
        }).then(function(data){
            return data
        }).catch(err => {
            res.json({success: false, message: 'Token inválido. Tente novamente.'})
        })

    if (instituicao){
        var data = await Associacao.create({
            AssociadoId: id,
            InstituiçõeId: instituicao.id 
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
}

module.exports = controllers;