var Gestor = require('../model/gestores');
var sequelize = require('../model/database');
const controller = {}
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
        res.json({success:true, data:data, message:"Updated successful"});
    }else{
        res.json({success:false, message:"Updated unsuccessful"});
    }
}

module.exports = controller