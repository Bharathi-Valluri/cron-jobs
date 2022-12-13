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
const deleteCornJobsData = async (req, res) => {
  try {
    const resp = await cronJobs.findAll({
      attributes: {
        exclude: ['id', 'UserName', 'EmailId', 'ValidityState']
      }
    })
    for (let index = 0; index < resp.length; index++) {
      date.setHours(0, 0, 0, 0)
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

      console.log(formatDate(new Date()))
      if (resp[index].ExpiryDate === formatDate(new Date())) {
        result = await cronJobs.destroy({
          where: {
            ExpiryDate: resp[index].ExpiryDate
          }
        })
        console.log('deleted')
      }
      console.log(resp[index].ExpiryDate)
    }
    res.status(201).json({
      message: 'success'
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: 'failed'
    })
  }
}

module.exports = {
  cronJobsDataInsertion,
  deleteCornJobsData
}
