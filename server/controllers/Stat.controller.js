const db = require("../models");
const Stat = db.Stat;

const utils = require('../utils');

// Create and Save a new Stat
exports.create = (req, res) => {
  // Validate request
  // if (utils.isEmptyObject(req.body)) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Stat
  const stat = new Stat({
    "nOfExecutionTextual": req.body.nOfExecutionTextual,
    "nOfExecutionStructural": req.body.nOfExecutionStructural,
    "sessions": req.body.sessions
  });

  // Save Stat in the database
  stat
    .save(stat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stat."
      });
    });
};

// Retrieve all Stats from the database.
exports.findAll = (req, res) => {
  // create condition object

  Stat.find()
    .select(["-sessions"])
    .then(data => {
      delete data.sessions;
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stats."
      });
    });
};

// Find a single Stat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Stat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Stat with id=" + id });
    });
};

// Delete all Stats from the database.
exports.deleteAll = (req, res) => {
  Stat.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Stats were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stats."
      });
    });
};