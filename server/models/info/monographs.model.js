module.exports = (sequelize, Sequelize) => {

  const MONOGRAPHS = sequelize.define("monographs", {
    name: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    userInfoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_infos', 
        key: 'id',
      }
    },
  });

  // USER_INFO.associate = () => {
  //   USER_INFO.belongsTo(sequlize.models.posts)
  //   USER_INFO.belongsTo(sequlize.models.academic_degrees)
  // };

  return MONOGRAPHS;
};