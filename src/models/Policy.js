const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  _id: false,
  policyId: {
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
