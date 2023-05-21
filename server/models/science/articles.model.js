
module.exports = (sequelize, Sequelize) => {

  const ARTICLES = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING
    },
    magazineName: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    numberCode: {
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

  return ARTICLES;
};