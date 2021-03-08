const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

// GET route for all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    console.log('im req user --------------------------------', req.user)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Get route for single product

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Review
      }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
