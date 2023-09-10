"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.TestResult, {
        onDelete: 'CASCADE',
      });
      Patient.hasMany(models.Medication, {
        onDelete: 'CASCADE',
      });
      Patient.hasMany(models.Appointment, {
        onDelete: 'CASCADE',
      });
      Patient.hasOne(models.EmergencyContact, {
        onDelete: 'CASCADE',
      });
      

    }
  }
  Patient.init(
    {
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
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        required: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      bloodGroup: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
