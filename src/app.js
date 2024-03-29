const express = require('express');
const app = express();
const middleware = require('./middleware');
const tarefa = require('./servico');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
  }));
//Configurações
app.set('port', process.env.PORT|| 3001);
//Middlewares
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    }); 


// Importação de Rotas
const gestorRouters = require('./routes/GestorRoute')
const instituiçãoRouters = require('./routes/InstituiçãoRoute')
const localRouters = require('./routes/LocalRoute')
const alertaRouters = require('./routes/AlertaRoute')
const relatorioRouters = require('./routes/RelatorioRoute')
const reporteRouters = require('./routes/ReporteRoute')
const associadoRouters = require('./routes/AssociadoRoute')
const authRoute = require('./routes/AutenticaçãoRoute')
const associacaoRoute = require ('./routes/AssociacaoRoute')

//Rotas
app.use('/gestor', gestorRouters)
app.use('/instituicao',instituiçãoRouters)
app.use('/local',localRouters)
app.use('/alerta',alertaRouters)
app.use('/relatorio',relatorioRouters)
app.use('/reporte',reporteRouters)
app.use('/associacao', associacaoRoute)
app.use('/associado',associadoRouters)

// Rotas: registar e login
app.use('/auth', authRoute);



app.listen(app.get('port'),()=>{
console.log("Start server on port "+app.get('port'))
})
