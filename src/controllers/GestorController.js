var Gestor = require('../model/gestores');
var sequelize = require('../model/database');
const controller = {}
const bcrypt = require('bcrypt');
sequelize.sync()
const { QueryTypes } = require('sequelize');
const Instituições = require('../model/instituições');
const Locais = require('../model/locais');
const Associações = require('../model/associacao')

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
    const query = `
    SELECT "Gestores".id, nome, email, "Instituições"."nome_instituicao" AS instituicao, "Gestores"."createdAt" AS data_associacao,
    "Instituições"."contacto_instituicao" AS contacto_instituicao
    FROM
    "Gestores"
    INNER JOIN "Instituições"
    ON "Instituições".id="Gestores"."InstituiçõeId"
    `
    const data = await sequelize.query(query,{ type: QueryTypes.SELECT })
    .then(function(data){
        return data
    }).catch(e => {
        return e
    })
    
    res.json({success: true, data: data})
}

encrypt = async (pass)  => {
    return await bcrypt.hash(pass, 10)
}

controller.alterarPass = async (req, res) => {
    const {id} = req.query

    const {pass, nova} = req.body

    if (id){
        var novapass = await encrypt(nova)

        var gestor = await Gestor.findOne(
        {
            where: {id: id}
        }
        ).then(function(data){
            return data
        }).catch(e => {
            return e
        })


        console.log(novapass)
        if (gestor){
            const isMatch = bcrypt.compareSync(pass, gestor.password)

            if (isMatch){
                gestor.password = novapass
                gestor.save()
                res.json({success:true, message:"Updated successfull"});
            }else{
                res.json({success:false, message:"As passwords não correspondem"});
            }
        }else{
            res.json({success:false, message:"Updated unsuccessful"});
        }

        res.json({data: gestor})
    }
}

controller.delete = async (req, res) => {
    const {id} = req.body

    if (id){
        var gestor = await Gestor.findOne({
            where: {id: id}
        })
        }

        var local = await Locais.destroy({ // DELETE
            where: {InstituiçõeId: gestor.InstituiçõeId}
        })

        var associado_instituicao = await Associação.destroy({
            where: {InstituiçõeId: gestor.InstituiçõeId}
        })

        await gestor.destroy()
        
        res.json({data: local, associacoes: associado_instituicao})
    }

module.exports = controller

/*VAR = O GESTOR

INSTITUICAO = SELECT * FROM Gestor WHERE id= VARIAVEL
DELETE FROM "Locais" WHERE "InstituiçõeId"= INSTITUICAO
DELETE FROM "Associado_Instituicao" WHERE InstituiçõeId=INSTITUICAO
DELETE FROM INSTITUICAO WHEERE ID = INSTITUICAO */