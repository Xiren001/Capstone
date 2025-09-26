"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM(
        "SYSTEM_ADMIN",
        "FIELD_COMMANDER",
        "UNIT_COMMANDER",
        "SOLDIER"
      ),
      allowNull: false,
      defaultValue: "SOLDIER",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "role");
  },
};

