"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Hash the password for the admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Insert admin user
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove the admin user
    await queryInterface.bulkDelete("users", {
      username: "admin",
    });
  },
};
