const db = require("../models");
const Action = db.Action;
const Session = db.Session;
const Stat = db.Stat;

// Retrieve all Actions from the database.
exports.general = async (req, res) => {
  // create condition object

  let statCount = await Stat.countDocuments({});
  let sessionStructuralCount = await Session.countDocuments({
    kind: 'Structural'
  });
  let sessionTextualCount = await Session.countDocuments({
    kind: 'Textual'
  });
  let actionCount = await Action.countDocuments({});

  try {
    res.send({
      statCount,
      sessionStructuralCount,
      sessionTextualCount,
      actionCount
    });
    return {
      statCount,
      sessionStructuralCount,
      sessionTextualCount,
      actionCount
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving stats."
    });
    return null;
  }
};