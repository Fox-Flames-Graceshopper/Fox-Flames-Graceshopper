const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

// GET route for all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//GET route for single product

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

//Post route for new review
router.post('/:id/review', async (req, res, next) => {
  try {
    await Review.create({
      title: req.body.title,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
      productId: req.body.productId
    })
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
