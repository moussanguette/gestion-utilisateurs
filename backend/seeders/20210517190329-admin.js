'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Utilisateurs', [{
      nom: 'admin',
      prenom: 'admin',
      role: 'admin',
      password: "$2y$10$aZCO.FmjSRU.fKQnBJt2iu0rcxRPgQPxUcl7pvR5/r56haioqBgdq",
      telephone: '7X',
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date()
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
