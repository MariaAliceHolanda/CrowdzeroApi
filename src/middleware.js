
//verifica o token de autenticação recebido em cada solicitação (req) e decidi se o pedido chega ou não à rota.

const jwt = require('jsonwebtoken'); 
const config = require('./config.js'); //ficheiro de configuração
let checkToken = (req, res, next) => {
let token = req.headers['x-access-token'] || req.headers['authorization']; 

if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length); //remove a palavra ‘Bearer ’
    }
    if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
    return res.json({
    success: false,
    message: 'O token não é válido.'
    });
    } else {
    req.decoded = decoded;
    next();
    }
    });
    } else {
        return res.json({
            success: false,
            message: 'Token indisponível.'
        });
    }
};
module.exports = {
checkToken: checkToken
}