const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Gestor = require('../model/gestores');
const Instituicao = require('../model/instituições')
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

controllers.register = async (req,res) => {
    const {nome, email, password, nome_empresa, contacto_empresa, email_empresa, lat, lon} = req.body;

    const instituicao = await Instituicao.create({
        nome: nome_empresa,
        contacto: contacto_empresa, 
        email: email_empresa,
        coord_x: lat,
        coord_y: lon
    }).catch(e =>{
        console.log("Erro "+ e)
        return e
    })

    if(instituicao){
        const data = await Gestor.create({
            nome:nome,
            email: email,
            password: password,
            instituiçõeId: instituicao.id
        })
        .then(function(data){
            return data;
        })
        .catch(error =>{
            console.log("Erro: "+error);
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
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }
    var gestor = await Gestor.findOne({where: { email: email}})
    .then(function(data){
    return data;
    })
    .catch(error =>{
    console.log("Erro: "+error);
    return error;
    })
    if (password === null || typeof password === "undefined") {
    res.status(403).json({
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
    res.json({success: true, message:' Autenticação realizada com sucesso!', token: token});
    } else {
    res.status(403).json({success: false, message: 'Dados de autenticação inválidos.'});
    }
    } else {
    res.status(400).json({success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.'});
    }
}} 

controllers.getGestor = async (req, res) => {
    if (req.body.id){
        var id = req.body.token
        var data = await Gestor.findOne({where: {id: id}})
        .then(function(data){
            return data
        })
        .catch(error =>{
            return error
        })
        res.status(200).json({
            success: true,
            message:"success",
            data: data
        });
    }
}

module.exports = controllers;