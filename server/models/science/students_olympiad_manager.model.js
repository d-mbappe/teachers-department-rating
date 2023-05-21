
module.exports = (sequelize, Sequelize) => {

  const STUDENTS_OLYMPIAD_MANAGER = sequelize.define("students_olympiad_manager", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    fio: {
      type: Sequelize.STRING
    },
    place: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    workingActivityId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'working_activities', 
        key: 'id',
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', 
        key: 'id',
      }
    },
  });

  // POST.associate = () => {
  //   console.log(sequelize.models, 99)
  //   POST.hasMany(sequelize.models.user_infos);
  // };

  return STUDENTS_OLYMPIAD_MANAGER;
};