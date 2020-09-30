const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/submit-code', require('./code'))
//router.use('/dockerTest', require('./testDocker')) //TO BE REMOVED AFTER DOCKER TESTING
//router.use('/dockerTestDockerode', require('./testDockerode')) //TO BE REMOVED AFTER DOCKER TESTING

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
