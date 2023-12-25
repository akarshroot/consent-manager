const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  metadata: {
    source: {
      type: String,
      required: true,
    },
  },
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

module.exports = EntitySchema;
