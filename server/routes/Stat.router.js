module.exports = app => {
  const stat = require("../controllers/Stat.controller.js");

  var router = require("express").Router();

  // Create a new stat
  router.post("/", stat.create);

  // Retrieve all stats
  router.get("/", stat.findAll);

  // Retrieve a single stats with id
  router.get("/:id", stat.findOne);

  // Retrieve all sessions from a stat
  router.get("/:id/sessions", stat.findSessionsByStatId);

  // Retrieve all actions from a stat
  router.get("/:id/actions", stat.findActionsByStatId);

  // Delete all stats
  router.delete("/", stat.deleteAll);

  app.use('/api/stat', router);
};