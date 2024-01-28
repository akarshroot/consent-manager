const mongoose = require('mongoose');

const RevokeRequestSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  consent: {
    type: String,
    required: true,
  },
  dateRequested: {
    type: Date,
    default: Date.now(),
    immutable: true,
    required: true,
  },
});

RevokeRequestSchema.index({ partner: 1, dateReqested: 1 });

module.exports = RevokeRequestSchema;
