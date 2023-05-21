'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('dissertation_council_member_types',
    [
      {
        id: uuidv4(),
        name: 'chairman',
        title: 'Председатель',
        workingActivityId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'deputyChairman',
        title: 'Заместитель председателя',
        workingActivityId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'academicSecretary',
        workingActivityId: 7,
        title: 'Учёный секретарь',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'councilMember',
        workingActivityId: 8,
        title: 'Член совета',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
