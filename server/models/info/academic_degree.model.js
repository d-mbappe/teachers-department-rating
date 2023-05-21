module.exports = (sequelize, Sequelize) => {

  const ACADEMIC_DEGREE = sequelize.define("academic_degrees", {

    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },

  });

  // ACADEMIC_DEGREE.associate = () => {
  //   ACADEMIC_DEGREE.hasMany(sequelize.models.user_info);
  // };

  return ACADEMIC_DEGREE;
};