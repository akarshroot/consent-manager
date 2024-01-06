const mongoose = require('mongoose');
const EntitySchema = require('./Entity');
const PolicySchema = require('./Policy');
const ConsentSchema = require('./Consent');
const PartnerSchema = require('./Partner');
const PolicyAttributeSchema = require('./PolicyAttribute');

const models = {};

const setupModels = () => {
  models.Entity = mongoose.model('Entity', EntitySchema);
  models.Policy = mongoose.model('Policy', PolicySchema);
  models.Consent = mongoose.model('Consent', ConsentSchema);
  models.Partner = mongoose.model('Partner', PartnerSchema);
  models.PolicyAttribute = mongoose.model('PolicyAttributeSchema', PolicyAttributeSchema);
};

module.exports = {
  setupModels,
  models,
};
