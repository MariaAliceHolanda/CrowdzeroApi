const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Associados = require('../model/associados');
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

controllers.register = async (req,res) => {

    const {nome, email ,password} = req.body

    if (nome && email && password){
        const data = await Associados.create({
            nome_user: nome,
                email_user: email,
                password_user: password
            }).then(function(data){
            return data;
            }).catch(error =>{
            console.log("Erro: "+error);
                res.json({success: false, message: 'Já existe um utilizador com este email. Tente novamente.'})
            })
            res.status(200).json({
                success: true,
                message:"Sucesso",
                data: data
            });
    }else{
        res.json({success: false, message: 'Existem campos em branco.'})
    }
}

function getDivisao(utilizador){
    if (utilizador.pontuacao_user < 100){
       return 0
    }else if (utilizador.pontuacao_user  > 100 && utilizador.pontuacao_user < 300){
       return 1
    }else if (utilizador.pontuacao_user > 400 && utilizador.pontuacao_user < 600){
        return 2
    }else if (utilizador.pontuacao_user > 700){
        return 3
    }
    return 0
}

function getNivel(utilizador){
    return Math.ceil(utilizador.pontuacao_user / 20);
}

controllers.login = async (req,res) => {
    const {email, password} = req.body

    if (email && password) { 
        var utilizador = await Associados.findOne({
            where: {email_user: email}
        })
        .then(function(utilizador){
            return utilizador;
        }).catch(error =>{
            res.status(404).json({success: false, message: 'Não encontrado'})
        })
        
        if (utilizador && utilizador.password_user){
            const isMatch = bcrypt.compareSync(password, utilizador.password_user);
                if (email === utilizador.email_user && isMatch) {
                    
               let token = jwt.sign({email_user: req.body.email}, config.jwtSecret,
                {expiresIn: '1h' //expira em 1 hora
                });

                const divisao = getDivisao(utilizador)
                const nivel = getNivel(utilizador)

                const data = {
                    id: utilizador.id,
                    nome: utilizador.nome_user,
                    email: utilizador.email_user,
                    pontuacao: utilizador.pontuacao_user,
                    divisao: divisao,
                    nivel: nivel,
                    reportes: utilizador.qnt_reportes,
                    conquistas: utilizador.conquistas
                }
    
                res.json({success: true, message:' Autenticação realizada com sucesso!', token: token, data: data});
            }
    
        }else {
     res.json({success: false, message: 'Dados de autenticação inválidos.'});
     }
    }else {
        res.json({success: false, message: 'Campos em branco.'});
    }

}
module.exports = controllers;