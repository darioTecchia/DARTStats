const db = require("../models");
const Action = db.Action;

// Retrieve all Actions from the database.
exports.findAll = async (req, res) => {
  // create condition object

  try {
    const data = await Action.find();
    delete data.sessions;
    res.send(data);
    return data;
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    return null;
  }
};

// Find a single Action with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Action.findById(id);
    if (!data) {
      res.status(404).send({ message: "Not found Action with id " + id });
    }
    else {
      res.send(data);
    }
    return data;
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Action with id=" + id });
    return null;
  }
};

// Delete all Actions from the database.
exports.deleteAll = async (req, res) => {

  try {
    const data = await Action.deleteMany({});
    res.send({
      message: `${data.deletedCount} Actions were deleted successfully!`
    });
    return { deleted: data.deletedCount };
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing all stats."
    });
    return null;
  }
};