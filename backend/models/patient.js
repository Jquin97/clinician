"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // define association here
      Patient.hasMany(models.TestResult, {
        onDelete: "CASCADE",
      });
      Patient.hasMany(models.Scans, {
        onDelete: "CASCADE",
      });
      Patient.hasMany(models.Medication, {
        onDelete: "CASCADE",
      });
      Patient.hasMany(models.Appointment, {
        onDelete: "CASCADE",
      });
      Patient.hasOne(models.EmergencyContact, {
        onDelete: "CASCADE",
      });
    }
  }
  Patient.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, "First name is required"],
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
        required: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        isEmail: true,
        len: [7, 50],
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
      },
      bloodGroup: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
