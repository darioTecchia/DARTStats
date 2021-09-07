module.exports = app => {
  const session = require("../controllers/Session.controller.js");

  var router = require("express").Router();

  // Retrieve all sessions
  router.get("/", session.findAll);

  // Retrieve a single sessions with id
  router.get("/:id", session.findOne);

  // Delete all sessions
  router.delete("/", session.deleteAll);

  app.use('/api/session', router);
};