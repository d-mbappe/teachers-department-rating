const { authJwt } = require("../middlware");
const controller = require("../controllers/user_info.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user",
    controller.getUser
  );
  app.post(
    "/api/user/info",
    controller.addInfo
  );
  app.get(
    "/api/user/info/:id",
    controller.getInfo
  );
  app.put(
    "/api/user/info/:id",
    controller.updateInfo
  );
  app.delete(
    "/api/user/info/:id",
    controller.removeInfo
  );
};