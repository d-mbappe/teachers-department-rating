module.exports = (sequelize, Sequelize) => {
  const WORKING_ACTIVIY = sequelize.define("working_activity", {
    name: {
      type: Sequelize.STRING
    },
    mark: {
      type: Sequelize.INTEGER
    },

  });

  return WORKING_ACTIVIY;
};