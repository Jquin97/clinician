"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Patient, {
        onDelete: "CASCADE", // If a user is deleted, delete associated patients
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        isEmail: true,
        len: [7, 50],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        len: [8, 20],
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
