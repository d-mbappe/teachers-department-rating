let jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;
const UserInfo = db.user_info;
const Monographs = db.monographs;
const config = require("../config/auth.config");

/**
 * * Получение данных из связанного с моделью справочника
 * @param {*} model 
 * @param {*} dictionary 
 * @returns 
 */
const getDataFromDictionary = async (model, dictionary) => {
  dictionary = 'get' + dictionary.charAt(0).toUpperCase() + dictionary.slice(1);

  const schema = await model[dictionary]();
  const { createdAt, updatedAt, ...data } = schema.toJSON();

  return data;
}

/**
 * * Запись монографий в таблицу
 * @param {*} monographs 
 * @param {*} userInfoId 
 */
const addMonographs = async (monographs, userInfoId) => {
  monographs.forEach(async element => {
    await Monographs.create({ ...element, userInfoId });
  });
}




/**
 * *Добавление информации о пользователе
 * @param {*} req 
 * @param {*} res 
 */
exports.addInfo = (req, res) => {
  const { fio, department, workYears, supervisorDefensesDissertations, userId, academicDegreeId, postId } = req.body;

  UserInfo.create({
    fio,
    department,
    workYears,
    supervisorDefensesDissertations,
    userId,
    academicDegreeId,
    postId,
  })
    .then(userInfo => {
      res.status(200).send(userInfo);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    })
};
/**
 * * Получение информации о пользователе
 * @param {*} req 
 * @param {*} res 
 */
exports.getInfo = async (req, res) => {
  let data = {};

  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(async user => {
      const { username, email } = user;
      const userInfo = await user.getUser_info();

      if (!userInfo) {
        res.status(200).send(data);
        return;
      }

      const monographs = await Monographs.findAll({
        where: {
          userInfoId: user.id
        }
      });   
      const post = await getDataFromDictionary(userInfo, 'post');
      const academicDegree = await getDataFromDictionary(userInfo, 'academic_degree');

      const { userId, postId, academicDegreeId, ...info } = userInfo.toJSON();

      data = { username, email, post, academicDegree, ...info, monographs };
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
/**
 * * Обновление информации о пользователе
 * @param {*} req 
 * @param {*} res 
 */
exports.updateInfo = async (req, res) => {
  const { monographs, ...data } = req.body;
  
  addMonographs(req.body.monographs, req.params.id);

  UserInfo.update(
    { ...data, updatedAt: Date.now() },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User info was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user info with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    })
};

/**
 * * Удаление информации о пользователе
 * @param {*} req 
 * @param {*} res 
 */
exports.removeInfo = async (req, res) => {
  UserInfo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User info was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user info with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    })
};

/**
 * * Получение базовых данных пользователя через токен из запроса
 * @param {*} req 
 * @param {*} res 
 */
exports.getUser = (req, res) => {
  if (req.headers["x-access-token"]) {
    let authorization = req.headers["x-access-token"],
      decoded;
    try {
      decoded = jwt.verify(authorization, config.SECRET);
    } catch (e) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const userId = decoded.id;

    User.findByPk(userId).then((user) => {
      const { id, email, username } = user;
      res.status(200).send({
        id, email, username
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
    return;
  }
  return res.send(500);
};


