const mongoose = require('mongoose');

const PartnerStorageSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  consents: {
    type: Number,
    default: 0,
    required: true,
  },
  policies: {
    type: Number,
    default: 0,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

PartnerStorageSchema.index({ partner: 1, date: 1 });

module.exports = PartnerStorageSchema;
