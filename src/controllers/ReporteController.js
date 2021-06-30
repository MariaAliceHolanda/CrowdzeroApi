var Reporte = require('../model/reportes');
var Sequelize = require('sequelize');
var sequelize = require('../model/database');
const Associados = require('../model/associados');
const Locais = require('../model/locais');
const Alerta = require('../model/alertas');
const Instituicao = require('../model/instituições');
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


        var baixo = reporteBaixo[0].count;
        var medio = reporteMedio[0].count;
        var alto = reporteAlto[0].count;
        console.log('Reportes baixos: ' + baixo);
        console.log('Reportes medios: ' + medio);
        console.log('Reportes altos: ' + alto);

        var estado = 0;
        if(baixo > medio && baixo>= alto){
            estado = 1;
        }
        else if(medio >=  baixo && medio > alto){
            estado = 2;
        }
        else if(alto >= medio && alto >= baixo){
            estado = 3;
        }
        
        console.log('Estado Local:' + estado)
        // Atualiza estado Locais
        const dado = await Locais.update({
          estado_local: estado,
          qtd_reporte_baixo: baixo,
          qtd_reporte_medio:medio,
          qtde_reporte_alto: alto,
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

        // Atualiza Estado Instituição do local reportado
        const instituicao =  await sequelize.query(`SELECT "InstituiçõeId" FROM public."Locais" where id = ${localId};`,{ type: QueryTypes.SELECT });
        const instituicaoID = instituicao[0].InstituiçõeId

        const baixoIns = await Locais.count({ where: {
            InstituiçõeId: instituicaoID,
            estado_local: 1
        }} );
        const medioIns = await Locais.count({ where: {
            InstituiçõeId: instituicaoID,
            estado_local: 2
        }} )
        const altoIns = await Locais.count({ where: {
            InstituiçõeId: instituicaoID,
            estado_local: 3
        }} )


        var estadoIns = 0;
        if(baixoIns > medioIns && baixoIns > altoIns){
            estadoIns = 1;
        }
        else if(medioIns >=  baixoIns && medioIns > altoIns){
            estadoIns = 2;
        }
        else if(altoIns >= medioIns && altoIns > baixoIns){
            estadoIns = 3;
        }
        
        // Atualiza estado da instituição
        const dadoIns = await Instituicao.update({
          estado_instituicao: estadoIns
         },
            {
            where: { id: instituicaoID}
         })
        .then( function(dadoIns){
        return dadoIns;
        })
        .catch(error => {
        return error;
        })
    
        

        // Criação de Alertas
        
        const gestor = `SELECT "Gestores"."id" from "Locais" inner join "Instituições" on "Locais"."InstituiçõeId" = "Instituições"."id"
        inner join "Gestores" on "Instituições"."id" = "Gestores"."InstituiçõeId" where "Locais".id = ${localId}`
        const gestorID = await sequelize.query(gestor,{ type: QueryTypes.SELECT });
        var gestorid = gestorID[0].id;
        console.log('Gestor id ' + gestorid)
         
         const tempoQuery = `SELECT "Alertas"."createdAt", DATE_PART('hour', now()::time - "createdAt"::time) * 60 + DATE_PART('minute', now()::time - "createdAt"::time) as tempo FROM "Alertas" 
        where "Alertas"."LocaiId" = ${localId}
        order by "Alertas"."createdAt" DESC
        LIMIT 1 ;`
        
        const tempoAlerta = await sequelize.query(tempoQuery,{ type: QueryTypes.SELECT });
       
        console.log(tempo)
        if(estado == 3 && tempo > 60){
            
           
            const alerta = await Alerta.create({
                tipo_alerta: 1,
                resolvido: 0,
                LocaiId: localId,
                GestoreId: gestorid
            })
            .then( function(alerta){
            return alerta;
            })
            .catch(error => {
                return res.json(error)
            })

        }

        return res.status(200).json(data)
        
    } catch (error) {
        console.log("Erro: "+error)
        return res.status(500).json(error)
    }
};

//  TERMINAR ESTA FUNÇÃO
controller.getReportes = async (req, res) => {
    // Dados
    const {data} = req.body
    const {filter, id} = req.query

    if (id){
        var query = `
        SELECT id, nome_local AS local, qtde_reporte_alto as alta,
        qtde_reporte_alto AS média, qtd_reporte_baixo AS baixa, qtd_reporte_baixo + qtde_reporte_alto + qtde_reporte_alto AS QuantidadeReportes
        FROM "Locais" WHERE "Locais"."InstituiçõeId"=${id}
        ORDER BY QuantidadeReportes DESC
        LIMIT 7`
        
        if (filter){
            var filtro = ``
            if(filter ==1){
                filtro = `> CURRENT_DATE - interval '7 days'`
            }else if(filter==2){
                filtro = `> CURRENT_DATE - interval '30 days'`
            }

            query = `
            SELECT id, nome_local AS local, qtde_reporte_alto as alta,
            qtde_reporte_alto AS média, qtd_reporte_baixo AS baixa, qtd_reporte_baixo + qtde_reporte_alto + qtde_reporte_alto AS QuantidadeReportes
            FROM "Locais" WHERE "Locais"."InstituiçõeId"=${id} AND "Locais"."ultimo_reporte" ${filtro}
            ORDER BY QuantidadeReportes DESC
            LIMIT 7
            `            

        if (filter == 3 && data){
            query = `
            SELECT id, nome_local AS local, qtde_reporte_alto as alta,
            DATE("Locais"."ultimo_reporte") as DIA,
            qtde_reporte_alto AS média, qtd_reporte_baixo AS baixa, qtd_reporte_baixo + qtde_reporte_alto + qtde_reporte_alto AS QuantidadeReportes
            FROM "Locais" WHERE "Locais"."InstituiçõeId"=${id} AND DATE("Locais"."ultimo_reporte") = '${data.data}'
            ORDER BY QuantidadeReportes DESC
            LIMIT 7
            `
        }
        }
        var dados = await sequelize.query(query, {type: QueryTypes.SELECT})
        .then(function(data){
            return data
        }).catch(e =>{
            return e
        })
        res.json({success: true, message: 'Dados obtidos com sucesso.', data: dados})
    }else{
        res.json({success: false, message: 'ID não fornecido.'})
    }
}
module.exports = controller