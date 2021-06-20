var Avatar = require('../model/avatar');
var sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

controllers.create = async (req,res) => {
    // data
    const {nomeAvatar, descrição, nPontuação, divisão }= req.body;
    // create
    const data = await Avatar.create({
     nomeAvatar: nomeAvatar,
     descrição: descrição,
     nPontuação: nPontuação,
     divisõeId: divisão
    })
    .then(function(data){
    return data;
    })
    .catch(error =>{
    console.log("Erro: "+error)
    return error;
    })
    // return res
    res.status(200).json({
        success: true,
        message:" Avatar Registado",
data: data
});
}
module.exports = controllers