const db = require("../models");
const Stat = db.Stat;
const Session = db.Session;

// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
  Session.find()
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

// Find a single Session with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Session.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Session with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Session with id=" + id });
    });
};

// Delete all Sessions from the database.
exports.deleteAll = (req, res) => {
  Session.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Sessions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stats."
      });
    });
};