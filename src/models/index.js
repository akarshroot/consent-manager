const mongoose = require('mongoose');
const EntitySchema = require('./Entity');
const PartnerSchema = require('./Partner');

const models = {};

const setupModels = () => {
  models.Entity = mongoose.model('Entity', EntitySchema);
  models.Partner = mongoose.model('Partner', PartnerSchema);
};

module.exports = {
  setupModels,
  models,
};
