const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    req.body.roles.forEach(role => {
      if(!ROLES.includes(role)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + role
        });
        return;
      }
    });
    // for (let i = 0; i < req.body.roles.length; i++) {
    //   if (!ROLES.includes(req.body.roles[i])) {
    //     res.status(400).send({
    //       message: "Failed! Role does not exist = " + req.body.roles[i]
    //     });
    //     return;
    //   }
    // }
  }
  
  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };