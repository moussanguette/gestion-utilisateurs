'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Administrateur.init({
    nom_admin: DataTypes.STRING,
    prenom_admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Administrateur',
  });
  return Administrateur;
};