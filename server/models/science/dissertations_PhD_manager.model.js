
module.exports = (sequelize, Sequelize) => {

  const DISSERTATIONS_PHD_MANAGER = sequelize.define("dissertations_PhD_manager", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
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
    fio: {
      type: Sequelize.STRING
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

  return DISSERTATIONS_PHD_MANAGER;
};