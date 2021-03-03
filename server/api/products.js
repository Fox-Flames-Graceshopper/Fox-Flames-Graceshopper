const router = require('express').Router()
const {Product} = require('../db/models')
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

//Get route for single product

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//add new product
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

//update existing product info
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    await product.update(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    await product.destroy()
    res.json(product)
  } catch (err) {
    next(err)
  }
})
