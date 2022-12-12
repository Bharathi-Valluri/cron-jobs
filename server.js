const cron = require('node-cron')
const express = require('express')
const sequelize = require('./db')
const router = require('./router/router')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
sequelize.sync()

async function run () {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
    cron.schedule('*/15 * * * * *', function () {
      console.log('---------------------')
      console.log('running a task every 15 seconds')
    })
    // cron.schedule(
    //   '0 1 * * *',
    //   () => {
    //     console.log('Running a job at 01:00 at America/Sao_Paulo timezone')
    //   },
    //   {
    //     scheduled: true,
    //     timezone: 'America/Sao_Paulo'
    //   }
    // )
    app.use('/', router)
    app.listen(process.env.PORT, () => {
      console.log(`serveris running on port no:${process.env.PORT}`)
    })
  } catch (error) {
    console.log('server is not running at port 8000' + error)
  }
}
run()
