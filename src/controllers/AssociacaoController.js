const Instituicao = require('../model/instituições')
const Associacao = require('../model/associacao')
const Associado = require('../model/associados')
const sequelize = require('../model/database');
const controllers = {}
sequelize.sync()
const { QueryTypes } = require('sequelize');

controllers.validate = async (req, res) => {
    const {token_access} = req.body

    if (token_access){
        instituicao  = await Instituicao.findOne({
            where: {token_acesso: token_access}
        }).then(function(data){
            return data
        }).catch(err => {
            res.json({success: false, message: 'Token inválido. Tente novamente.'})
        })
        res.json({success: true, message:'Token válido. Associação a ser completa', data: instituicao});
    }else{
        res.json({success: false, message:'Campos em branco, verifique novamente.'});
    }
}

controllers.create = async (req, res) => {
    const {token_access, id} = req.body

    if (token_access && id){
        var instituicao = await Instituicao.findOne({
            attributes: ['id', ['nome_instituicao', 'instituição'], ['qnt_espacos', 'espacos']],
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
            messagem: 'Associação realizada'
        })
    }else{
        res.json({success: false, message:'Campos em branco, verifique novamente.'});
    }
}
}

controllers.list = async (req, res) => {
    // ID da instituição
    const {id} = req.query

    if (id){
        const query = `
        SELECT "Associados"."id", "Associados"."nome_user"
        AS "nome", "Associados"."createdAt"
        AS "data", "Associados"."qnt_reportes" AS "reportes", (SELECT MAX("createdAt")
        FROM "Reportes" WHERE "Associados"."id" = "Reportes"."AssociadoId") AS ultimo
        FROM "Instituicao_Associados" AS "Instituicao_Associados" 
        INNER JOIN "Associados" ON "id"="AssociadoId"
        WHERE "Instituicao_Associados"."InstituiçõeId" = ${id};`

        const data = await sequelize.query(query, {type: QueryTypes.SELECT })
        .then(function(data){
            return data
        }).catch(e => {
            return e
        })
        res.json({success: true, data: data})
    }else{
        res.json({success: false, message: 'Erro'})
    }
}

/**        var associados = await Instituicao.findOne({
            include: {
                model: Associado, 
                attributes: ['nome_user', 'createdAt', 'qnt_reportes']},
            where: {id: id},
            attributes: ['id', 'nome_instituicao']
        }) */

controllers.MinhasAssociacoes = async (req, res) => {
    const { id } = req.params;
    const data = await sequelize.query(
        `SELECT "Instituições".id, latitude, longitude, nome_instituicao,estado_instituicao
	FROM "Instituições" inner join "Instituicao_Associados" on "Instituições"."id" = "Instituicao_Associados"."InstituiçõeId"
	inner join "Associados" on "Instituicao_Associados"."AssociadoId" = "Associados"."id" where "AssociadoId" =  ${id};`
    ,{ type: QueryTypes.SELECT })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    return error;
    })
    res.json({ success: true, data: data });
}

controllers.RankingUsers = async (req, res) => {
    const data = await sequelize.query(
        `SELECT id, nome_user, pontuacao_user, qnt_reportes, divisao, nivel
        FROM public."Associados"
        order by pontuacao_user DESC;`
    ,{ type: QueryTypes.SELECT })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    return error;
    })
    res.json({ success: true, data: data });
}
module.exports = controllers;