"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("grades", {
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subject",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      student_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "student",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      grade: {
        type: Sequelize.ENUM,
        values: [
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "D-",
          "F",
        ],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
    await queryInterface.addConstraint("grades", {
      fields: ["student_id", "subject_id"],
      type: "primary key",
      name: "grades_pk",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("grades", "grades_pk");
    await queryInterface.dropTable("grades");
  },
};
