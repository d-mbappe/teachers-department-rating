'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('working_activities',
      [
        {
          name: 'Подготовка и защита кандидатских диссертаций под Вашим руководством (за отчётный период)',
          mark: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Аттестация в учёном звании «профессор»',
          mark: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Аттестация в учёном звании «доцент»',
          mark: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Отзывы на авторефераты диссертации',
          mark: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Работа в Диссертационном совете: председатель',
          mark: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Работа в Диссертационном совете: заместитель председателя',
          mark: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Работа в Диссертационном совете: учёный секретарь',
          mark: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Работа в Диссертационном совете: член совета',
          mark: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Защита кандидатской диссертации (за отчётный период)',
          mark: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Защита докторской диссертации (за отчётный период)',
          mark: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Статьи в журналах (из списка ВАК)',
          mark: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Статьи в региональных сборниках научных трудов, сборниках статей и прочих изданиях',
          mark: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Студенты, подготовленные под Вашим руководством и принявшие участие в российских научных олимпиадах, конкурсах',
          mark: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Студенты – победители научных международных олимпиад, конкурсов, подготовленные под Вашим руководством (грамоты, призовые места, лауреаты, дипломанты)',
          mark: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Руководство НИРС на кафедре',
          mark: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Руководство ВКР бакалавров',
          mark: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Руководство дипломным проектированием специалистов',
          mark: 1.5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Руководство диссертационными работами магистров ',
          mark: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
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
