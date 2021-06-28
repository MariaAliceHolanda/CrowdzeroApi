const Instituicao = require('../model/instituições')
const Associacao = require('../model/associacao')
const Associado = require('../model/associados')
const sequelize = require('../model/database');
const controllers = {}
sequelize.sync()
const { QueryTypes } = require('sequelize');


controllers.create = async (req, res) => {
    const {token_access, id} = req.body

    if (token_access && id){
        var instituicao = await Instituicao.findOne({
            where: {token_acesso: token_access}
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
            res.json({success: false, message: 'Ocorreu um erro ao associar. Verifique os dados'})
        })
        var increment = await instituicao.increment('qnt_associados',{by: 1})
        res.status(200).json({
            success: true,
            messagem: 'Associação realizada',
            data: instituicao
        })
    }else{
        res.json({success: false, message:'Campos em branco, verifique novamente.'});
    }
}
}

controllers.list = async (req, res) => {
    // ID da instituição
    const {id} = req.query

    //SELECT * FROM ASSOCIACAO WHERE InstituiçõeId = 4

    if (id){
        const data = await sequelize.query(
            `SELECT * FROM Instituicao_Associados INNER JOIN Associados on id=AssociadoId WHERE InstituiçõeId=4`, { model: Associacao, type: QueryTypes.SELECT })
        .then(function(data){
            return data
        }).catch(e => {
            console.log(e)
            return e
        })
        res.json({success: true, data: data})

    }
}

/**        var associados = await Instituicao.findOne({
            include: {
                model: Associado, 
                attributes: ['nome_user', 'createdAt', 'qnt_reportes']},
            where: {id: id},
            attributes: ['id', 'nome_instituicao']
        }) */

module.exports = controllers;