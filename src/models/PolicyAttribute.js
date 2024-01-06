const mongoose = require('mongoose');

const PolicyAttributeSchema = new mongoose.Schema({
  _id: false,
  attId: {
    type: String,
    required: true,
    unique: true,
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

module.exports = PolicyAttributeSchema;
