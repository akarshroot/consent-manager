const mongoose = require('mongoose');

const ConsentLogSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  consent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

ConsentLogSchema.index({ partner: 1, date: 1 });

module.exports = ConsentLogSchema;
