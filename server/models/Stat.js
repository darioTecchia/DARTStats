module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      id: false,
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
    {
      versionKey: false,
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    }
  );

  schema.virtual('nOfTotalExecution').get(function () {
    return this.nOfExecutionStructural + this.nOfExecutionTextual;
  });

  const Stat = mongoose.model("Stat", schema);
  return Stat;
};