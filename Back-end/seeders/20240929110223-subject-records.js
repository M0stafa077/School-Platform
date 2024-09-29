"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("subject", [
      {
        name: "Computer Organization",
        numberOfHours: 3,
        teacher_id: 1,
      },
      {
        name: "Operating Systems",
        numberOfHours: 4,
        teacher_id: 2,
      },
      {
        name: "Data structure and Algorithms",
        numberOfHours: 2,
        teacher_id: 3,
      },
      {
        name: "Artificial Intelligence",
        numberOfHours: 3,
        teacher_id: 4,
      },
      {
        name: "Database",
        numberOfHours: 2,
        teacher_id: 5,
      },
      {
        name: "measurements",
        numberOfHours: 1,
        teacher_id: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subject", null, {});
  },
};
