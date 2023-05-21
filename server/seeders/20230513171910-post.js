'use strict';
const { v4: uuidv4 } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('posts',
      [
        {
          id: uuidv4(),
          name: 'assistant',
          title: 'Ассистент',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          name: 'seniorLecturer',
          title: 'Старший преподаватель',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          name: 'docent',
          title: 'Доцент',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          name: 'professor',
          title: 'Профессор',
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
