module.exports = (sequelize, Sequelize) => {
  const DISSERTATION_COUNCIL_MEMBER_TYPE = sequelize.define("dissertation_council_member_type", {
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
    workingActivityId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'working_activities', 
        key: 'id',
      }
    },
    

  });

  return DISSERTATION_COUNCIL_MEMBER_TYPE;
};