const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const Expires = 86400;  // 24 hours

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
exports.signUp = (req, res) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(user => {
    let token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn: Expires
    });

    const successResponce = {
      accessToken: token,
      message:  "User was registered successfully!" 
    };

    if(req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      })    
      .then(roles => {
        const authorities = roles.map(role => role.name.toUpperCase());

        user.setRoles(roles).then(() => {
          res.send({...successResponce, roles: authorities});
        })
      })
    } 
    // else {
    //   user.setRoles([1]).then(() => {
    //     res.send(successResponce);
    //   });
    // }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    let token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn: Expires
    });

    user.getRoles().then(roles => {
      const authorities = roles.map(role => role.name.toUpperCase());

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};