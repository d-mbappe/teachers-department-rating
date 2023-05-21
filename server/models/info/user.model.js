module.exports = (sequelize, Sequelize) => {
  const USER = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },

  });

  // USER.associate = function(models) {
  //   USER.hasOne(models.user_infos);
  // };


  return USER;
};