"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("grades", [
      {
        subject_id: 1,
        student_id: "10101010101010",
        grade: "A+",
      },
      {
        subject_id: 2,
        student_id: "10101010101010",
        grade: "A",
      },
      {
        subject_id: 3,
        student_id: "10101010101010",
        grade: "A-",
      },
      {
        subject_id: 4,
        student_id: "10101010101010",
        grade: "B+",
      },
      {
        subject_id: 5,
        student_id: "10101010101010",
        grade: "B",
      },
      {
        subject_id: 6,
        student_id: "10101010101010",
        grade: "B-",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("grafes", null, {});
  },
};
