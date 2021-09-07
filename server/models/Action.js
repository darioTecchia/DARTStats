module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      id: false,
      sessionId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Session'
      },
      statId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Stat'
      },
      actionKind: String,
      smellKind: String,
      timestamp: Number,
      className: String,
      methodName: String,
      packageName: String,
      actionCanceled: Boolean,
      actionDone: Boolean
    },
    {
      versionKey: false,
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    }
  );

  const Action = mongoose.model("Action", schema);
  return Action;
};