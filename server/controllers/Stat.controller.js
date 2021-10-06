const db = require("../models");
const Stat = db.Stat;
const Session = db.Session;
const Action = db.Action;

// Create and Save a new Stat
exports.create = async (req, res) => {
  // Validate request
  // if (utils.isEmptyObject(req.body)) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

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

  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Stat."
    });
  }

  // stat
  //   .save(stat)
  //   .then(data => {
  //     res.send(data);
  //   })
};

// Retrieve all Stats from the database.
exports.findAll = (req, res) => {
  Stat.find()
    .select(["-sessions"])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stats."
      });
    });
};

exports.findSessionsByStatId = (req, res) => {
  const id = req.params.id;

  Session.find({ statId: id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stats."
      });
    });
}

exports.findActionsByStatId = (req, res) => {
  const id = req.params.id;

  Action.find({ statId: id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stats."
      });
    });
}

// Find a single Stat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stat.findById(id)
    .deepPopulate("sessions sessions.actions")
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