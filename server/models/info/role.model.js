module.exports = (sequelize, Sequelize) => {
  const ROLE = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },

  });

  return ROLE;
};