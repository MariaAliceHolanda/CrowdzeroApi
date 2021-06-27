const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Associados = require('../model/associados');
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

controllers.register = async (req,res) => {
    const {nome, email, password} = req.body
    console.log(req.body)
        const data = await Associados.create({
            nome_user: nome,
            email_user: email,
            password_user: password
        }).then(function(data){
        return data;
        }).catch(error =>{
        console.log("Erro: "+error);
        return error;
        })
        res.status(200).json({
            success: true,
            message:"Sucesso",
            data: data
        });
}

controllers.login = async (req,res) => {
    if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    }
    var utilizador = await Associados.findOne({where: { email_user: email}}).then(function(data){
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
    if (req.body.email && req.body.password && utilizador) {
    const isMatch = bcrypt.compareSync(password, utilizador.password);
    if (req.body.email === utilizador.email_user && isMatch) {
    let token = jwt.sign({email_user: req.body.email}, config.jwtSecret,
    {expiresIn: '1h' //expira em 1 hora
    });
    res.json({success: true, message:' Autenticação realizada com sucesso!', token: token, data: data});
    } else {
    res.status.json({success: false, message: 'Dados de autenticação inválidos.'});
    }
    } else {
    res.status.json({success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.'});
    }
}} 
module.exports = controllers;