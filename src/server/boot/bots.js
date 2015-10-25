module.exports = (app) => {
  return app.config.bots.map(botName => {
    console.log("loading " + botName)
    const BotClass = require( `../bots/${botName}` )(app)
    return new BotClass()
  })
}
