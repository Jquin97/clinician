"use strict";

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Patients", [
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: new Date(),
        gender: faker.person.sexType(),
        phone: "0436282123",
        bloodGroup: "0+",
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: new Date(),
        gender: faker.person.sexType(),
        phone: "0436282123",
        bloodGroup: "0+",
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: new Date(),
        gender: faker.person.sexType(),
        phone: "0436282123",
        bloodGroup: "0+",
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: new Date(),
        gender: faker.person.sexType(),
        phone: "0436282123",
        bloodGroup: "0+",
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Patients", null, {});
  },
};
