const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// Get all users
// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Get a single user
// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Update a single user
// PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    await User.update(
      {email: req.body.email},
      {
        where: {
          id: req.params.userId
        }
      }
    )

    const user = await User.findByPk(req.params.userId)

    res.json(user)
  } catch (error) {
    next(error)
  }
})
