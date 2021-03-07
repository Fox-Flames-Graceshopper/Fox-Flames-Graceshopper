const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.send(newUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const toDelete = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!toDelete) {
      res.sendStatus(404)
    } else {
      await toDelete.destroy()
      res.json(toDelete)
    }
  } catch (err) {
    next(err)
  }
})
