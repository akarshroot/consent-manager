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
  permissions: {
    read: {
      type: Boolean,
      required: true,
      default: true,
    },
    write: {
      type: Boolean,
      required: true,
      default: false,
    },
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
