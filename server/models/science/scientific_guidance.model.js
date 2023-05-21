
module.exports = (sequelize, Sequelize) => {

  const SCIENTIFIC_GUIDANCE = sequelize.define("scientific_guidance", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER
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

  return SCIENTIFIC_GUIDANCE;
};