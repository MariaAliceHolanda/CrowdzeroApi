var Gestor = require('../model/gestores');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()

controller.get = async (req, res) => {
    const id = req.body.id
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

module.exports = controller