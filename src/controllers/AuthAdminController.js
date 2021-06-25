const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../model/admin');
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

controllers.register = async (req,res) => {
        const {email, password } = req.body;
        const data = await Admin.create({
        email: email,
        password: password
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

controllers.login = async (req,res) => {
    if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    }
    var admin = await Admin.findOne({where: { email: email}})
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
    if (req.body.email && req.body.password && admin) {
    const isMatch = bcrypt.compareSync(password, admin.password);
    if (req.body.email === admin.email && isMatch) {
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
module.exports = controllers;