module.exports = (sequelize, Sequelize) => {
  // console.log(Sequelize.models, 88)
  // console.log(sequelize.models, 99)
  const USER_INFO = sequelize.define("user_info", {
    fio: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    workYears: {
      type: Sequelize.INTEGER
    },
    supervisorDefensesDissertations: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', 
        key: 'id',
      }
    },
    academicDegreeId: {
      type: Sequelize.UUID,
      references: {
        model: 'academic_degrees', 
        key: 'id',
      }
    },
    postId: {
      type: Sequelize.UUID,
      references: {
        model: 'posts', 
        key: 'id',
      }
    },

  });

  // USER_INFO.associate = () => {
  //   USER_INFO.belongsTo(sequlize.models.posts)
  //   USER_INFO.belongsTo(sequlize.models.academic_degrees)
  // };

  return USER_INFO;
};