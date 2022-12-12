const cronjobs_controller = require('../controller/cronJobsController')
const router = require('express').Router()
router.post('/saveData', cronjobs_controller.cronJobsDataInsertion)
router.put('/updaterecord/:id', cronjobs_controller.updateCronJobsData)
router.delete('/deleteOneRecord', cronjobs_controller.deleteCornJobsData)
module.exports = router
