
module.exports = (sequelize, Sequelize) => {

  const POST = sequelize.define("posts", {
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

  // POST.associate = () => {
  //   console.log(sequelize.models, 99)
  //   POST.hasMany(sequelize.models.user_infos);
  // };

  return POST;
};