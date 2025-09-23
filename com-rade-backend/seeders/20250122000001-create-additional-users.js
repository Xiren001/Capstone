"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Hash passwords for different users
    const adminPassword = await bcrypt.hash("admin123", 10);
    const commanderPassword = await bcrypt.hash("commander123", 10);
    const soldierPassword = await bcrypt.hash("soldier123", 10);

    // Insert multiple users with different roles
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: adminPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "commander",
        password: commanderPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "soldier",
        password: soldierPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded users
    await queryInterface.bulkDelete("users", {
      username: ["admin", "commander", "soldier"],
    });
  },
};
