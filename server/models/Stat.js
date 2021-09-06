module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      nOfExecutionTextual: Number,
      nOfExecutionStructural: Number,
      sessions: {
        _id: false,
        type: [{
          userId: String,
          projectName: String,
          startTime: Number,
          endTime: Number,
          nOfGF: Number,
          nOfET: Number,
          nOfLOC: Number,
          nOfTotalClasses: Number,
          kind: String,
          actions: {
            _id: false,
            type: [{
              actionKind: String,
              smellKind: String,
              timestamp: Number,
              className: String,
              methodName: String,
              packageName: String,
              actionCanceled: Boolean,
              actionDone: Boolean
            },]
          }
        }]
      }
    },
    { versionKey: false }
  );

  const Stat = mongoose.model("Stat", schema);
  return Stat;
};