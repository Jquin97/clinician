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
        email: `${uuidv4().slice(0, 4)}@gmail.com`,
        password: await authHelper.encryptPassword("test123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
