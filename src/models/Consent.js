const mongoose = require('mongoose');

const ConsentSchema = new mongoose.Schema({
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  clientPolicyId: {
    type: String,
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

ConsentSchema.index({ policyId: 1, uid: 1, partner: 1 }, { unique: true });

module.exports = ConsentSchema;
