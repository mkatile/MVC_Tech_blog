'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the `email` column allowing NULL values initially
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: true, // Allow NULL values initially
    });

    // Optionally, update existing rows to have a default email
    await queryInterface.sequelize.query(`
      UPDATE users SET email = 'default@example.com' WHERE email IS NULL;
    `);

    // Modify the column to NOT NULL
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `email` column
    await queryInterface.removeColumn('users', 'email');
  }
};
