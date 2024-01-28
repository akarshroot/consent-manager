const mongoose = require('mongoose');

const ConsentSchema = new mongoose.Schema({
  policyAttributeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  metadata: {
    source: {
      type: String,
      required: true,
    },
  },
  timestamp: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
    required: true,
  },
});

ConsentSchema.index({ uid: 1 });
ConsentSchema.index({ policyAttributeId: 1 });
module.exports = ConsentSchema;
