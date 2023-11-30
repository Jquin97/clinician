'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scans.init({
    attachments: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  }, {
    sequelize,
    modelName: 'Scans',
  });
  return Scans;
};