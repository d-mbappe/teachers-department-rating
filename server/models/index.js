const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    operatorsAliases: 0,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Инициализация таблиц
db.user = require("./info/user.model.js")(sequelize, Sequelize);
db.role = require("./info/role.model.js")(sequelize, Sequelize);
db.user_info = require("./info/user_info.model.js")(sequelize, Sequelize);
db.post = require("./info/post.model.js")(sequelize, Sequelize);
db.academic_degree = require("./info/academic_degree.model.js")(sequelize, Sequelize);
db.working_activity = require("./info/working_activity.model.js")(sequelize, Sequelize);
db.monographs = require("./info/monographs.model")(sequelize, Sequelize);

db.academic_certification = require("../models/science/academic_certification.model.js")(sequelize, Sequelize);
db.articles = require("../models/science/articles.model.js")(sequelize, Sequelize);
db.dissertation_council_member_type = require("../models/science/dissertation_council_member_type.model.js")(sequelize, Sequelize);
db.dissertation_council_member = require("../models/science/dissertation_council_member.model.js")(sequelize, Sequelize);
db.dissertation_reviews = require("../models/science/dissertation_reviews.model.js")(sequelize, Sequelize);
db.dissertations_defence = require("../models/science/dissertations_defence.model.js")(sequelize, Sequelize);
db.dissertations_PhD_manager = require("../models/science/dissertations_PhD_manager.model.js")(sequelize, Sequelize);
db.scientific_guidance = require("../models/science/scientific_guidance.model.js")(sequelize, Sequelize);
db.students_olympiad_manager = require("../models/science/students_olympiad_manager.model.js")(sequelize, Sequelize);

// Добавление связей
db.user.hasOne(db.user_info, {foreignKey: 'userId'});

db.monographs.belongsTo(db.user_info);

db.post.hasMany(db.user_info);
db.user_info.belongsTo(db.post);

db.academic_degree.hasMany(db.user_info);
db.user_info.belongsTo(db.academic_degree);

// 	Подготовка и защита кандидатских диссертаций под руководством 
db.working_activity.hasMany(db.dissertations_PhD_manager);
db.dissertations_PhD_manager.belongsTo(db.working_activity);
db.user.hasMany(db.dissertations_PhD_manager);
db.dissertations_PhD_manager.belongsTo(db.user);



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;