const mongoose = require('mongoose');
const EntitySchema = require('./Entity');
const PolicySchema = require('./Policy');
const ConsentSchema = require('./Consent');
const PartnerSchema = require('./Partner');
const ConsentLogSchema = require('./ConsentLog');
const RevokeRequestSchema = require('./RevokeRequest');
const PartnerStorageSchema = require('./PartnerStorage');
const PolicyAttributeSchema = require('./PolicyAttribute');

const models = {};

const setupModels = () => {
  models.Entity = mongoose.model('Entity', EntitySchema);
  models.Policy = mongoose.model('Policy', PolicySchema);
  models.Consent = mongoose.model('Consent', ConsentSchema);
  models.Partner = mongoose.model('Partner', PartnerSchema);
  models.ConsentLog = mongoose.model('ConsentLog', ConsentLogSchema);
  models.RevokeRequest = mongoose.model('RevokeRequest', RevokeRequestSchema);
  models.PartnerStorage = mongoose.model('PartnerStorage', PartnerStorageSchema);
  models.PolicyAttribute = mongoose.model('PolicyAttribute', PolicyAttributeSchema);
};

module.exports = {
  setupModels,
  models,
};
