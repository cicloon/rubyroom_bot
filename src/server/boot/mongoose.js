module.exports = (app) => {
  console.log('mongoooooose');
  app.models = require('../models/index')(app);
  app.slackUsers = require('../slackUsers')(app);
}
