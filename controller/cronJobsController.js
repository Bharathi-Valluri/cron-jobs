const cronJobs = require('../models/userDetails')
const cron = require('node-cron')
const date = new Date()
const sequelize = require('../db')
const Op = require('sequelize').Op
const cronJobsDataInsertion = async (req, res) => {
  try {
    const resp = await cronJobs.bulkCreate(req.body)
    res.status(200).json({
      response: resp,
      message: 'Data inserted successfully'
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      response: null,
      message: 'failed'
    })
  }
}
function padTo2Digits (num) {
  return num.toString().padStart(2, '0')
}
function formatDate (date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate())
  ].join('-')
}
const deleteCornJobsData = async (req, res) => {
  try {
    date.setHours(0, 0, 0, 0)
    console.log(formatDate(new Date()))
    const resp = await cronJobs.destroy({
      where: {
        ExpiryDate: formatDate(new Date())
      }
    })
    console.log('deleted')
    console.log('---------------------')
    console.log('running a task every 30 seconds')
    console.log(resp)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  cronJobsDataInsertion,
  deleteCornJobsData
}
