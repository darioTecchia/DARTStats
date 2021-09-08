module.exports = mongoose => {
  const deepPopulate = require('mongoose-deep-populate')(mongoose);

  var schema = mongoose.Schema(
    {
      id: false,
      userId: String,
      projectName: String,
      startTime: Number,
      endTime: Number,
      nOfGF: Number,
      nOfET: Number,
      nOfLOC: Number,
      nOfTotalClasses: Number,
      kind: String,
      statId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Stat'
      },
      actions: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Action'
      }],
    },
    {
      versionKey: false,
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
    }
  );

  schema.plugin(deepPopulate);

  const Session = mongoose.model("Session", schema);
  return Session;
};