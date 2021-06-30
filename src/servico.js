const cron = require('node-cron');
function verificaAtualizacaoReportes(){
    console.log('funcao cron rodando')
    
    // seta o estado a 0 dos locais que não tem reporte a mais de uma hora
    // essa tarefa é executada a cada meia hora no sistema
    const data =  sequelize.query(`UPDATE public."Locais"
	SET estado_local=0
	WHERE DATE_PART('hour', now()::time - "ultimo_reporte"::time) * 60 +
        DATE_PART('minute', now()::time - "ultimo_reporte"::time) > 60;`,{ type: QueryTypes.SELECT });

}

module.exports = cron.schedule('*/30 * * * * ', verificaAtualizacaoReportes)