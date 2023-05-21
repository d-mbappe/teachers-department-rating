
module.exports = (sequelize, Sequelize) => {

  const DISSERTATION_REVIEWS = sequelize.define("dissertation_reviews", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE
    },
    fio: {
      type: Sequelize.STRING
    },
    specialization: {
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

  return DISSERTATION_REVIEWS;
};