const app = require('express').Router()
const policiesController = require('../controllers/policyController.js')
const policyController = require('../controllers/policyController.js')
const middleware = require('../controllers/authController.js')

app.get('/', middleware.ensureAuthenticated, policiesController.getPolicies)
app.get(
  '/by-user/:clientId',
  middleware.ensureAuthenticated,
  policyController.getPoliciesByClientId
)

module.exports = app
