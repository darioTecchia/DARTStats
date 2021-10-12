module.exports = mongoose => {
  const deepPopulate = require('mongoose-deep-populate')(mongoose);

  var schema = mongoose.Schema(
    {
      id: false,
      nOfExecutionTextual: Number,
      nOfExecutionStructural: Number,
      timestamp: Number,
      sessions: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Session'
      }],
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

  schema.plugin(deepPopulate);

  const Stat = mongoose.model("Stat", schema);
  return Stat;
};