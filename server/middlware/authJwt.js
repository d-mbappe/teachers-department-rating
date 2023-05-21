const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

/**
 *
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers.authorization;

  if(!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if(err) res.status(401).send({ message: "Unauthorized!" });
    
    req.userId = decoded.id;
    next();
  })
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then (user => {
    user.getRoles().then(roles => {
      roles.forEach(role => {
        if(role.name === "admin") {
          next();
          return;
        }
      })
    });

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  })
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {

      roles.forEach(role => {
        if(role.name === "moderator") {
          next();
          return;
        }
      })
   
      res.status(403).send({ message: "Require Moderator Role!"});
    });
  });
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      roles.forEach(role => {
        if(role === "moderator") {
          next();
          return;
        }

        if(role.name === "admin") {
          next();
          return;
        }
      })

      res.status(403).send({ message: "Require Moderator or Admin Role!" });
    });
  });
};



module.exports = { verifyToken, isAdmin, isModerator, isModeratorOrAdmin };