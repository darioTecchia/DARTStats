module.exports = app => {
  const general = require("../controllers/General.controller.js");

  var router = require("express").Router();

  // Retrieve all generals
  router.get("/", general.general);

  app.use('/api/general', router);
};