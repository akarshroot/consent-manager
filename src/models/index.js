const mongoose = require('mongoose');
const EntitySchema = require('./Entity');
const PartnerSchema = require('./Partner');
const PolicySchema = require('./Policy');
const PolicyAttributeSchema = require('./PolicyAttribute');

const models = {};

const setupModels = () => {
  models.Entity = mongoose.model('Entity', EntitySchema);
  models.Partner = mongoose.model('Partner', PartnerSchema);
  models.Policy = mongoose.model('Policy', PolicySchema);
  models.PolicyAttribute = mongoose.model('PolicyAttributeSchema', PolicyAttributeSchema);
};

module.exports = {
  setupModels,
  models,
};
