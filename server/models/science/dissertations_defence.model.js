
module.exports = (sequelize, Sequelize) => {

  const DISSERTATIONS_DEFENCE = sequelize.define("dissertations_defence", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    fio: {
      type: Sequelize.STRING
    },
    place: {
      type: Sequelize.STRING
    },
    numberCode: {
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

  return DISSERTATIONS_DEFENCE;
};