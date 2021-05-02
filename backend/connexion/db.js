//connection a la base de donné
const Sequelize = require('sequelize');// import du module sequelize
// configuration de la base de donné
var sequelize = new Sequelize('gestionUtilisateur', 'moussa', 'Moussa3001', {
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        idle: 10000
    }
})
//exporter la configuration de la base de donné
module.exports=sequelize;