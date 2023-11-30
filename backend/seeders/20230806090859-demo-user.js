"use strict";
const authHelper = require("../helper/authHelper");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        firstName: "John",
        lastName: "Doe",
        email: "test@gmail.com",
        password: await authHelper.encryptPassword("123456"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "John 2",
        lastName: "Doe 2",
        email: "testuser441133@gmail.com",
        password: await authHelper.encryptPassword("12345678"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
