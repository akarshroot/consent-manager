const mongoose = require('mongoose');

const PolicyAttributeSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  validity: {
    type: Number,
    requried: true,
  },
  description: {
    type: String,
    required: true,
  },
});

PolicyAttributeSchema.index({ partner: 1, title: 1 }, { unique: true });

module.exports = PolicyAttributeSchema;
