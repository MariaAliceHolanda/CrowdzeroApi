var Relatorio = require('../model/relatórios');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()
controller.create = async (req,res) => {
    // data
    const {IDGESTOR, DESCRICAO}= req.body;
    // create
    const data = await Relatorio.create({
        GestoreId: IDGESTOR,
        descricao: DESCRICAO
        
    })
    .then(function(data){
    return data;
    })
    .catch(error =>{
     console.log("Erro: "+error)
    res.status(500).json({success: false, message: 'Relatorio não registado'});
    })
    // return res
    res.status(200).json({ success: true,message:"Alerta Registado",data: data});
}
module.exports = controller