const cronjobs_controller = require('../controller/cronJobsController')
const router = require('express').Router()
router.post('/saveData', cronjobs_controller.cronJobsDataInsertion)
module.exports = router
