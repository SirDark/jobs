const express = require('express')
const { allJobs, createJob, deleteJob, updateJob, aJob } = require('../controllers/jobs')
const router = express.Router()

router.route('/').get(allJobs).post(createJob)
router.route('/:id').delete(deleteJob).patch(updateJob).get(aJob)


module.exports = router