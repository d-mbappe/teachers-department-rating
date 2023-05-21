// const { authJwt } = require("../middlware");
const controller = require("../controllers/sciense_work.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/science",
    controller.addScienceActivities
  );
  app.get(
    "/api/user/science/memberTypes",
    controller.getMemberTypes
  );
  // app.get(
  //   "/api/user/science/:id",
  //   controller.getInfo
  // );
  // app.put(
  //   "/api/user/science/:id",
  //   controller.updateInfo
  // );
  // app.delete(
  //   "/api/user/science/:id",
  //   controller.removeInfo
  // );
};