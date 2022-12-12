const cronJobs = require('../models/userDetails')
const cron = require('node-cron')
const sequelize = require('../db')
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
const updateCronJobsData = async (req, res) => {
  try {
    const resp = await cronJobs.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    console.log(resp)
    res.status(202).json({
      response: resp,
      message: 'success'
    })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({
      response: null,
      message: 'Failed!....'
    })
  }
}
const deleteCornJobsData = async (req, res) => {
  let ExpiryDate = '2022-12-12'
  try {
    if (ExpiryDate == Date.now()) {
      const resp = await cronJobs.destroy({
        where: {
          ExpiryDate: req.body.ExpiryDate
        }
      })
      console.log(resp)
      console.log('User expired')
    } else {
      console.log('valid user')
    }
    res.status(201).json({
      message: 'success'
    })
  } catch (err) {
    res.status(400).json({
      response: null,
      message: err.message
    })
  }
}

module.exports = {
  cronJobsDataInsertion,
  updateCronJobsData,
  deleteCornJobsData
}
