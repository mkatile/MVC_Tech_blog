'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure no NULL values are present in the email column
    await queryInterface.sequelize.query(
      `UPDATE users SET email = 'default@example.com' WHERE email IS NULL`
    );

    // Alter the column to enforce NOT NULL constraint
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column to allow NULL values if necessary
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  }
};
