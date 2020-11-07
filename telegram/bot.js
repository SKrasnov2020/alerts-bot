const { Telegraf } = require("telegraf")
require("dotenv").config()

const bot = new Telegraf(process.env.BOT_KEY)

const sendChannelAlert = (alertText) => {
  bot.telegram.sendMessage(process.env.CHANNEL_ID, alertText).then(value => {
    console.log(value)
  }).catch(err => {
    console.error(err)
  })
}

module.exports = {
  sendChannelAlert
}