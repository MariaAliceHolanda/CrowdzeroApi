const Instituicao = require('../model/instituições')
const Associacao = require('../model/associacao')
const Associado = require('../model/associados')
const sequelize = require('../model/database');
const controllers = {}
sequelize.sync()
const { QueryTypes } = require('sequelize');

// Validar acesso a instituição
controllers.validate = async (req, res) => {
    const {token_access} = req.body

    if (token_access){
        const instituicao  = await Instituicao.findOne({
            attributes: ['nome_instituicao', 'qnt_espacos', 'qnt_associados', 'contacto_instituicao', 'latitude', 'longitude'],
            where: {token_acesso: token_access}
        }).then(function(data){
            return data
        }).catch(err => {
            res.json({success: false, message: 'Token inválido. Tente novamente.'})
        })
        if (instituicao){
            res.json({success: true, message:'Token válido. Associação a ser completa', data: instituicao});
        }else{
            res.json({success: false, message:'Token não é válido'});
        }
    }else{
        res.json({success: false, message:'Campos em branco, verifique novamente.'});
    }
}

// Cria associação entre usuário e instituição
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

//Lista Instituições
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

//Remove Associação
controllers.remover = async (req, res) => {
    const {id} = req.query

    if (id){
        var associado = await Associacao.findOne({
            where: {AssociadoId: id}
        })

        if (associado){
            console.log(associado)
            const query = `DELETE FROM "Instituicao_Associados" WHERE "AssociadoId"=${id}`

            await sequelize.query(query, {type: QueryTypes.DELETE})
        }else{
            res.json({success: false, message: 'Unsuccessfull'})
        }
    }
}



// Devolve Associações do usuário
controllers.MinhasAssociacoes = async (req, res) => {
    const { id } = req.params;
    const data = await sequelize.query(
        `SELECT DISTINCT "Instituições".id, MAX("Locais"."ultimo_reporte") AS ultimo_reporte,
        latitude, longitude, nome_instituicao, estado_instituicao
        FROM
        "Instituições" 
        INNER JOIN "Instituicao_Associados" ON "Instituições"."id" = "Instituicao_Associados"."InstituiçõeId"
        INNER JOIN "Associados" ON "Instituicao_Associados"."AssociadoId" = "Associados"."id"
        INNER JOIN "Locais" ON "Locais"."InstituiçõeId"="Instituições".id
        WHERE "AssociadoId" =  ${id}
        GROUP BY "Instituições".id, latitude, longitude, nome_instituicao, estado_instituicao`
    ,{ type: QueryTypes.SELECT })
    .then(function(data){
    return data;
    })
    .catch(error =>{
        return res.json(error)
    })
    res.json({ success: true, data: data });
}

// Ranking de users por maiores pontuações
controllers.RankingUsers = async (req, res) => {
    const data = await sequelize.query(
        `SELECT nome_user, pontuacao_user, 
        CASE
             WHEN pontuacao_user < 100  THEN '0'
             WHEN pontuacao_user > 100 AND pontuacao_user < 300  THEN '1'
             WHEN pontuacao_user > 400 AND pontuacao_user < 600 THEN '2'
             WHEN pontuacao_user > 700 THEN '3'
             ELSE '0' END
             AS divisão
        FROM "Associados"
        order by pontuacao_user DESC`
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