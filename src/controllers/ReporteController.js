var Reporte = require('../model/reportes');
var Sequelize = require('sequelize');
var sequelize = require('../model/database');
const Associados = require('../model/associados');
const Locais = require('../model/locais');
const Alerta = require('../model/alertas');
const { QueryTypes } = require('sequelize');
//const { Sequelize } = require('sequelize/types');
//const { now } = require('sequelize/types/lib/utils');
const controller = {}
sequelize.sync()

controller.create = async (req,res) => {
    
    try {

            // data
        const {nivelReporte,localId, associadoId} = req.body;
        // create
        const data = await Reporte.create({
            nivel_reporte: nivelReporte,
            LocaiId:localId,
            AssociadoId: associadoId,
        })


        // Update pontuação/ reportes feitos
        const associadoPT = await Associados.update({
            pontuacao_user:  Sequelize.literal('pontuacao_user + 10'),
            qnt_reportes:  Sequelize.literal('qnt_reportes + 1')
        },
        {
        where: { id: associadoId}
        })
        .then( function(associadoPT){
        return associadoPT;
        })
        .catch(error => {
        return error;
        })

        // Atualiza Estado do Local
        //const query = `SELECT count(*) FROM "Reportes" where "Reportes"."LocaiId" = ${localId} AND DATE_PART('hour', now()::time - "createdAt"::time) * 60 +
        //DATE_PART('minute', now()::time - "createdAt"::time) <= 60 AND nivel_reporte = 1;`
        const query2 = `SELECT count(*) FROM "Reportes" where "Reportes"."LocaiId" = ${localId} AND DATE_PART('hour', now()::time - "createdAt"::time) * 60 +
        DATE_PART('minute', now()::time - "createdAt"::time) <= 60 AND nivel_reporte = 2;`
        const query3  = `SELECT count(*) FROM "Reportes" where "Reportes"."LocaiId" = ${localId} AND DATE_PART('hour', now()::time - "createdAt"::time) * 60 +
        DATE_PART('minute', now()::time - "createdAt"::time) <= 60 AND nivel_reporte = 3;`
        const reporteBaixo = await sequelize.query(`SELECT count(*) FROM "Reportes" where "Reportes"."LocaiId" = ${localId} AND DATE_PART('hour', now()::time - "createdAt"::time) * 60 +
        DATE_PART('minute', now()::time - "createdAt"::time) <= 60 AND nivel_reporte = 1;`,{ type: QueryTypes.SELECT });
        const reporteMedio = await sequelize.query(query2,{ type: QueryTypes.SELECT });
        const reporteAlto = await sequelize.query(query3,{ type: QueryTypes.SELECT });

       /* reporteMedio = await Reporte.count({
            where: {
              LocaiId: localId,
              nivel_reporte: 2,
              
              $and : [
                sequelize.where(sequelize.fn(
                    'timestampdiff', 
                    sequelize.literal("minute"),
                    sequelize.col('createdAt'),
                    sequelize.literal('CURRENT_TIMESTAMP')
                    ), ) ,
                
            ]
            
            } 
          });*/

        var baixo = reporteBaixo[0].count;
        var medio = reporteMedio[0].count;
        var alto = reporteAlto[0].count;
        console.log(baixo);
        console.log(medio);
        console.log(alto);

        var estado = 0;
        if(baixo >= medio && baixo> alto){
            estado = 1;
        }
        else if(medio >=  baixo && medio > alto){
            estado = 2;
        }
        else if(alto > medio && alto > baixo){
            estado = 3;
        }
        
        console.log(estado)
        const dado = await Locais.update({
          estado_local: estado,
          ultimo_reporte: data.createdAt
         },
            {
            where: { id: localId}
         })
        .then( function(dado){
        return dado;
        })
        .catch(error => {
        return error;
        })

        // Criação de Alertas
        
        const gestor = `SELECT "Gestores"."id" from "Locais" inner join "Instituições" on "Locais"."InstituiçõeId" = "Instituições"."id"
        inner join "Gestores" on "Instituições"."id" = "Gestores"."InstituiçõeId" where "Locais".id = ${localId}`
        const gestorID = await sequelize.query(gestor,{ type: QueryTypes.SELECT });
        
        if(estado == 3){
           var gestorid = gestorID[0].id;
            const alerta = await Alerta.create({
                tipo_alerta: 1,
                resolvido: false,
                locaiId: localId,
                GestoreId: gestorid
            })
            .then( function(alerta){
            return alerta;
            })
            .catch(error => {
            return error;
            })

        }


        /*let qtde_incrementar
        if (nivelReporte == 0){
            qtde_incrementar = 'qtd_reporte_baixo'
        }else if (nivelReporte == 1){
            qtde_incrementar = 'qtd_reporte_medio'
        }else if (nivelReporte == 2){
            qtde_incrementar = 'qtde_reporte_alto'
        }

        var local = await Locais.findOne({
                where: {id: localId}
        })

        await local.increment(qtde_incrementar, {by: 1})*/

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};


controller.UpdatePontuacao = async (req,res) => {
    // parameter get id
    const { id } = req.params;
    // Update pontuação/ reportes feitos
    const data = await Associados.update({
        pontuacao_user:  Sequelize.literal('pontuacao_user + 10'),
        qnt_reportes:  Sequelize.literal('qnt_reportes + 1')
       },
       {
       where: { id: id}
    })
    .then( function(data){
    return data;
    })
    .catch(error => {
    return error;
    })
      
    const dados = await Associados.findOne({
        attributes:{include :['pontuacao_user', 'qnt_reportes'],
        exclude: ['id','nome_user','email_user','password_user','divisao','createdAt','updatedAt']
     },
        where: { id : id } 
    })
    .then( function(dados){
    return dados;
    })
    .catch(error => {
    return error;
    })
    res.json({success:true, data:dados, message:"Updated successful"});
}


//  TERMINAR ESTA FUNÇÃO
controller.getReportes = async (req, res) => {
    // Dados
    const {filtro, id} = req.query

    if (id){
        var query = `SELECT id, nome_local AS local, qtde_reporte_alto as alta,
        qtde_reporte_alto AS média, qtd_reporte_baixo AS baixa, qtd_reporte_baixo + qtde_reporte_alto + qtde_reporte_alto AS QuantidadeReportes
        FROM "Locais" WHERE "Locais"."InstituiçõeId"=${id}
        ORDER BY QuantidadeReportes DESC
        LIMIT 7`

        console.log(req.query)

        if (filtro){
            var filter = ``
            if(filtro ==1){
                filter = `<= now() - INTERVAL '7 DAYS`
            }else if(filtro==2){
                filter = `<= now() - INTERVAL '30 DAYS`
            }else if(filtro==3){
                filter = `<= now() - INTERVAL '30 DAYS`
                console.log(filtro)
            }


            query = `
            SELECT DISTINCT "Locais".id, "Locais"."nome_local" AS "local", "Locais"."qtde_reporte_alto" AS alto,
            "Locais"."qtd_reporte_medio" AS média, "Locais"."qtd_reporte_baixo" AS baixa, 
            MAX("Reportes"."createdAt") as "data_ultimo_reporte"
            FROM "Reportes"
            INNER JOIN
            "Locais"
            ON "Locais".id="Reportes"."LocaiId"
            WHERE "data_ultimo_reporte" = '2021-06-28'
            GROUP BY "Locais"."nome_local", "Locais".id
            LIMIT 7
            `
        }
        
        var data = await sequelize.query(query, {type: QueryTypes.SELECT})
        .then(function(data){
            return data
        }).catch(e =>{
            return e
        })
        res.json({success: true, message: 'Dados obtidos com sucesso.', data: data})
    }else{
        res.json({success: false, message: 'ID não fornecido.'})
    }
}
module.exports = controller

/**     SELECT id, nome_local AS local, qtde_reporte_alto as alta,
            qtde_reporte_alto AS média, qtd_reporte_baixo AS baixa, qtd_reporte_baixo + qtde_reporte_alto + qtde_reporte_alto AS QuantidadeReportes
            FROM "Locais" WHERE "Locais"."InstituiçõeId"=1 AND "Locais"."updatedAt" ${filter}'
            ORDER BY QuantidadeReportes DESC
            LIMIT 7
        
        
       
        */