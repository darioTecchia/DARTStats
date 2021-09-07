module.exports = app => {
  const action = require("../controllers/Action.controller.js");

  var router = require("express").Router();

  // Retrieve all actions
  router.get("/", action.findAll);

  // Retrieve a single actions with id
  router.get("/:id", action.findOne);

  // Delete all actions
  router.delete("/", action.deleteAll);

  app.use('/api/action', router);
};