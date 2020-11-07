const fs = require("fs")
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const { sendChannelAlert } = require("./telegram/bot")

require("dotenv").config();

const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"

const settings = fs.readFileSync("settings.json")
const parsedSettings = JSON.parse(settings)

const app = express()

app.use(cors())
app.use(express.json())

app.post("/webhook", bodyParser.text(), (req, res) => {
  let ip = req.headers['x-forwarded-for'] ?
      req.headers['x-forwarded-for'].split(',')[0] :
      req.connection.remoteAddress;

  if (!parsedSettings.ipWhitelist.includes(ip)) {
    return res.status(400).send()
  }

  try {
    sendChannelAlert(req.body)

    return res.status(200).send()
  } catch (err) {
    return res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`)
})