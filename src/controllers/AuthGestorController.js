const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Gestor = require('../model/gestores');
const Instituicao = require('../model/instituições')
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

controllers.register = async (req,res) => {
    const {nome, email, password, nome_empresa, contacto_empresa, foto_empresa, email_empresa, lat, lon} = req.body;

    var token_acesso = generateOTP()

    var instituicao = await Instituicao.create({
        nome_instituicao: nome_empresa,
        contacto_instituicao: contacto_empresa, 
        email_instituicao: email_empresa,
        foto_instituicao: foto_empresa,
        latitude: lat,
        longitude: lon,
        token_acesso: token_acesso
    }).catch(e =>{
        console.log(e)
        res.json({success: false, message: "Ocorreu um erro no servidor. Tente novamente."})
        return e
    })

    if(instituicao){    
        const data = await Gestor.create({
            nome:nome,
            email: email,
            password: password,
            InstituiçõeId: instituicao.id
        })
        .then(function(data){
            return data;
        }).catch(error =>{
            return error;
        })
        res.status(200).json({
            success: true,
            message:"Registado",
            data: data
        });
    }
}

controllers.login = async (req,res) => {
    const {email, password} = req.body
    if (email && password) {
        var gestor = await Gestor.findOne({where: {email: email}})
        .then(function(data){
            return data
        })
        .catch(e =>{
            res.json({success: false, message: 'Campos incorretos.'})
        })

        const isMatch = bcrypt.compareSync(password, gestor.password)
        if (email === gestor.email && isMatch){
            let token = jwt.sign({email: email}, config.jwtSecret,
                {expiresIn: '1h' //expira em 1 hora
                });
            res.json({success: true, message:' Autenticação realizada com sucesso!', token: token, user: gestor});
        }else{
            res.json({success: false, message:' Erro, password inválida.'});
        }
    }else{
        res.json({success: false, message: 'Campos em branco'})
    }
}

/*controllers.login = async (req,res) => {
    const {email, password} = req.body    
    if (email && password) {
        var email = req.body.email;
        var password = req.body.password;
    
    var gestor = await Gestor.findOne({where: { email: email}})
    .then(function(data){
    return data;
    }).catch(error =>{
    console.log("Erro: "+error);
    return error;
    })
    if (password === null || typeof password === "undefined") {
    res.json({
    success: false,
    message: 'Campos em Branco'
    });
   }
   else {
    if (req.body.email && req.body.password && gestor) {
    const isMatch = bcrypt.compareSync(password, gestor.password);
    if (req.body.email === gestor.email && isMatch) {
        let token = jwt.sign({email: req.body.email}, config.jwtSecret,
        {expiresIn: '1h' //expira em 1 hora
        });
        res.json({success: true, message:' Autenticação realizada com sucesso!', token: token, user: gestor});
    } else {
    res.json({success: false, message: 'Dados de autenticação inválidos.'});
    }
    } else {
    res.json({success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.'});
    }
}
}
}*/ 
module.exports = controllers;