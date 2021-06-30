var Gestor = require('../model/gestores');
var sequelize = require('../model/database');
const controller = {}
const bcrypt = require('bcrypt');
sequelize.sync()

controller.get = async (req, res) => {
    const {id} = req.query
    if (id){
        var data = await Gestor.findOne({where: {id: id}})
        .then(function(data){
            return data
        }).catch(error =>{
            res.json({success: false, message: 'Falha em obter os dados.'});
        })
        if (data.id.toString() === id.toString())
            {   
                res.status(200).json({
                success: true,
                message:"success",
                data: data
            });
        }else{
            res.json({
                success: false, 
                message: 'erro',
            });
        }
    }else {
        res.json({success: false, message: 'Id não fornecido.'});
        }
}

controller.instituicao = async (req, res) => {
    const {id} = req.query

    if (id){
        instituicao = await Gestor.findOne({
            where: {InstituiçõeId: id}
        }).then(function(data){
            return data
        }).catch(e=>{
            return e
        })

        res.status(200).json({success: true, message: 'Success', data: instituicao})
    }else{
        res.json({success: false, message: 'Erro'})
    }
}

controller.update = async (req, res) => {
    const {id} = req.query

    const {nome, email} = req.body

    if (id){
        const data = await Gestor.update({
            nome: nome,
            email: email
        },{ 
            where: {id: id}
        }).then(function(data){
            return data
        }).catch(e => {
            return e
        })
        res.json({success:true, message:"Updated successful"});
    }else{
        res.json({success:false, message:"Updated unsuccessful"});
    }
}

controller.list = async (req, res) => {
    const data = await Gestor.findAll().then(function(data){
        return data
    }).catch(e => {
        return e
    })
    res.json({success: true, data: data})
}

function encrypt(pass){
    return bcrypt.hash(pass, 10)
    .then(hash => {
    pass = hash;
    })
    .catch(err => {
        return err
    });
}

controller.alterarPass = async (req, res) => {
    const {id} = req.query

    const {pass, nova} = req.body

    if (id){
        var novapass = await encrypt(nova)

        console.log(novapass)

        var gestor = await Gestor.update({
            password: novapass,
        },
        {
            where: {id: id}
        }
        ).then(function(data){
            return data
        }).catch(e => {
            return e
        })

        res.json({data: gestor})
    }
}

module.exports = controller