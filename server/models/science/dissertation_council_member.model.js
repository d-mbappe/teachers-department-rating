
module.exports = (sequelize, Sequelize) => {

  const DISSERTATION_COUNCIL_MEMBER = sequelize.define("dissertation_council_member", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    place: {
      type: Sequelize.STRING
    },
    numberCode: {
      type: Sequelize.STRING
    },
    univercity: {
      type: Sequelize.STRING
    },
    memberTypeId: {
      type: Sequelize.UUID,
      references: {
        model: 'dissertation_council_member_types', 
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

  return DISSERTATION_COUNCIL_MEMBER;
};