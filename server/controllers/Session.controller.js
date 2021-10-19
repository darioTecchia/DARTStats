const db = require("../models");
const Session = db.Session;

// Retrieve all Sessions from the database.
exports.findAll = async (req, res) => {
  // create condition object

  try {
    const data = await Session.find();
    delete data.sessions;
    res.send(data);
    return data;
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    throw error;
  }
};

// Find a single Session with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Session.findById(id);
    if (!data) {
      res.status(404).send({ message: "Not found Session with id " + id });
      throw new Error("Not found Session with id " + id)
    }
    else {
      res.send(data);
      return data;
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Session with id=" + id });
    throw error;
  }
};

// Delete all Sessions from the database.
exports.deleteAll = async (req, res) => {

  try {
    const data = await Session.deleteMany({});
    res.send({
      message: `${data.deletedCount} Sessions were deleted successfully!`
    });
    return { deleted: data.deletedCount };
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing all stats."
    });
    throw error;
  }
};