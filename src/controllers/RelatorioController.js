var Relatorio = require('../model/relatórios');
var sequelize = require('../model/database');
const controller = {}
sequelize.sync()
controller.create = async (req,res) => {
    // data
    const {IDLOCAL, IDGESTOR, TIPOALERTA, HORAALERTA }= req.body;
    // create
    const data = await Relatorio.create({
        LocaiId: IDLOCAL,
        gestoreId: IDGESTOR,
        TipoAlerta: TIPOALERTA,
        HORAALERTA: now()
    })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    console.log("Erro: "+error)
    return error;
    })
    // return res
    res.status(200).json({ success: true,message:"Alerta Registado",data: data});
}
module.exports = controller