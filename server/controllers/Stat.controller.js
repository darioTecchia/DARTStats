const db = require("../models");
const Stat = db.Stat;
const Session = db.Session;
const Action = db.Action;

// Create and Save a new Stat
exports.create = async (req, res) => {

  let body = req.body;

  // Create a Stat
  let stat = new Stat({
    "nOfExecutionTextual": req.body.nOfExecutionTextual,
    "nOfExecutionStructural": req.body.nOfExecutionStructural,
    "sessions": []
  });

  // Save Stat in the database
  try {
    body.sessions.forEach(s => {
      let session = new Session({
        "userId": s.userId,
        "projectName": s.projectName,
        "startTime": s.startTime,
        "endTime": s.endTime,
        "nOfGF": s.nOfGF,
        "nOfET": s.nOfET,
        "nOfLOC": s.nOfLOC,
        "nOfTotalClasses": s.nOfTotalClasses,
        "nOfTotalMethods": s.nOfTotalMethods,
        "kind": s.kind,
        "statId": stat._id,
        "actions": []
      });
      stat.sessions.push(session._id);

      s.actions.forEach(a => {
        let action = new Action({
          "actionKind": a.actionKind,
          "smellKind": a.smellKind,
          "timestamp": a.timestamp,
          "className": a.className,
          "methodName": a.methodName,
          "packageName": a.packageName,
          "actionCanceled": a.actionCanceled,
          "actionDone": a.actionDone,
          "statId": stat._id,
          "sessionId": session._id
        });
        session.actions.push(action._id);

        action.save(action);
      });
      session.save(session);
    });
    await stat.save(stat);
    res.send(stat);
    return stat;

  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Stat."
    });
  }
};

// Retrieve all Stats from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Stat.find()
      .select(["-sessions"]);
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

exports.findSessionsByStatId = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Session.find({ statId: id });
    res.send(data);
    return data;
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    throw error;
  }
}

exports.findActionsByStatId = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Action.find({ statId: id })
    res.send(data);
    return data;

  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    throw error;
  }
}

// Find a single Stat with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Stat.findById(id)
      .deepPopulate("sessions sessions.actions");
    if (!data) {
      res.status(404).send({ message: "Not found Stat with id " + id });
    } else {
      res.send(data);
    }
    return data;
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    throw error;
  }
};

// Delete all Stats from the database.
exports.deleteAll = async (req, res) => {

  try {
    const data = await Stat.deleteMany({});
    res.send({
      message: `${data.deletedCount} Stats were deleted successfully!`
    });
    return { deleted: data.deletedCount };
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all stats."
    });
    throw error;
  }
};