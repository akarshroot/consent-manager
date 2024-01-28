const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  clientPolicyId: {
    type: String,
    required: true,
    unique: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    requried: true,
  },
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PolicyAttribute',
    },
  ],
  description: {
    type: String,
    default: '',
  },
  versionHistory: [
    {
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      timestamp: {
        type: Date,
        immutable: true,
        required: true,
        default: Date.now(),
      },
    },
  ],
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

module.exports = PolicySchema;
