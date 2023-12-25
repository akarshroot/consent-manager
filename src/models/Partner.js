const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  rbac: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
    required: true,
  },
});

module.exports = PartnerSchema;
