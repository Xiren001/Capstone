"use strict";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Hash passwords for different users
    const adminPassword = await bcrypt.hash("admin123", 10);
    const commanderPassword = await bcrypt.hash("commander123", 10);
    const unitCommanderPassword = await bcrypt.hash("unit123", 10);
    const soldierPassword = await bcrypt.hash("soldier123", 10);

    // Insert multiple users with different roles
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: adminPassword,
        role: "SYSTEM_ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "commander",
        password: commanderPassword,
        role: "FIELD_COMMANDER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "unit_commander",
        password: unitCommanderPassword,
        role: "UNIT_COMMANDER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "soldier",
        password: soldierPassword,
        role: "SOLDIER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded users
    await queryInterface.bulkDelete("users", {
      username: ["admin", "commander", "unit_commander", "soldier"],
    });
  },
};
