const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Associados = require('../model/associados');
const sequelize = require('../model/database');
const config = require('../config');
const controllers = {}
sequelize.sync()

controllers.register = async (req,res) => {

    console.log(nome, email, password)

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

controllers.login = async (req,res) => {
    const {email, password} = req.body

    if (email && password) { 
        var utilizador = await Associados.findOne({
            where: {email_user: email}
        })
        .then(function(utilizador){
            return utilizador;
        }).catch(error =>{
        return error;
        })
        
        if (utilizador && utilizador.password_user){
            const isMatch = bcrypt.compareSync(password, utilizador.password_user);
                if (email === utilizador.email_user && isMatch) {
                    
               let token = jwt.sign({email_user: req.body.email}, config.jwtSecret,
                {expiresIn: '1h' //expira em 1 hora
                });
    
                const dadosAtualizados = await Associados.findOne({
                    attributes:{include :['id','email_user','pontuacao_user', 'qnt_reportes','divisao','nivel'],
                    exclude: ['password_user']
                    },
                    where: { id : utilizador.id } 
                }).then(function(dadosAtualizados){
                return dadosAtualizados;
                }).catch(error =>{
                console.log("Erro: "+error);
                    res.json({success: false, message: 'Erro.'})
                })
    
                res.json({success: true, message:' Autenticação realizada com sucesso!', token: token, data: dadosAtualizados});
            }
    
        }else {
     res.json({success: false, message: 'Dados de autenticação inválidos.'});
     }
    }else {
        res.json({success: false, message: 'Campos em branco.'});
    }

}
module.exports = controllers;