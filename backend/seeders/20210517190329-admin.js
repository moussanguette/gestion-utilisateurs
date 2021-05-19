'use strict';
const bcrypt = require('bcrypt');

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
var password='$2b$10$c1Yz0im5Ixez3FIexw2ecuT8G3AVpRA7E4xPGr7B5.oShziG5AHBC'
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
       if (err) return cb(err)
       password = hash
       cb()
      })
     })

     await queryInterface.bulkInsert('Utilisateurs', [{
      nom: 'admin',
      prenom: 'admin',
      role: 'Administrateur',
      pseudo: 'admin',
      adresse: 'null part',
      password: password,
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
