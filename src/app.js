const express = require('express');
const app = express();
const middleware = require('./middleware');
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
const adminRouters = require('./routes/AdminRoute')
const utilizadorRouters = require('./routes/UtilizadorRoute')
const gestorRouters = require('./routes/GestorRoute')
const avatarRouters = require('./routes/AvatarRoute')
const instituiçãoRouters = require('./routes/InstituiçãoRoute')
const localRouters = require('./routes/LocalRoute')
const alertaRouters = require('./routes/AlertaRoute')
const relatorioRouters = require('./routes/RelatorioRoute')
const reporteRouters = require('./routes/ReporteRoute')
const associadoRouters = require('./routes/AssociadoRoute')
const favoritosRouters = require('./routes/favoritosRoute')
const authRoute = require('./routes/AutenticaçãoRoute')
//Rotas
app.use('/admin',adminRouters)
app.use('/utilizador',utilizadorRouters)
app.use('/gestor', gestorRouters)
app.use('/avatar',avatarRouters)
app.use('/instituicao',instituiçãoRouters)
app.use('/local',localRouters)
app.use('/alerta',alertaRouters)
app.use('/relatorio',relatorioRouters)
app.use('/reporte',reporteRouters)
app.use('/associado',associadoRouters)
app.use('/favoritos',favoritosRouters)
//app.use('/auth',middleware.checkToken, authRoute);
app.use('/auth', authRoute);

app.listen(app.get('port'),()=>{
console.log("Start server on port "+app.get('port'))
})
