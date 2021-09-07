const db = require("../models");
const Action = db.Action;

// Retrieve all Actions from the database.
exports.findAll = (req, res) => {
  // create condition object

  Action.find()
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

// Find a single Action with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Action.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Action with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Action with id=" + id });
    });
};

// Delete all Actions from the database.
exports.deleteAll = (req, res) => {
  Action.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Actions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stats."
      });
    });
};