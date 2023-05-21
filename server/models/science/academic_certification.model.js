
module.exports = (sequelize, Sequelize) => {
  
  const ACADEMIC_CERTIFICATION = sequelize.define("academic_certification", {
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

  return ACADEMIC_CERTIFICATION;
};