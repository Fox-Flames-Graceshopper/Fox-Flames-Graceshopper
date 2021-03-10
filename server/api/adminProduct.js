const router = require('express').Router()
const {Product, Review} = require('../db/models')
const isAdmin = require('./IsAdminMiddleware')
module.exports = router

//add new product
router.post('/', isAdmin, async (req, res, next) => {
  try {
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl
    })
    const updatedproducts = await Product.findAll()
    res.send(updatedproducts)
  } catch (err) {
    next(err)
  }
})

//update existing product info
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Review
      }
    })
    await product.update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//delete product
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!product) {
      res.sendStatus(404)
    } else {
      await product.destroy()
      const updatedproducts = await Product.findAll()
      res.json(updatedproducts)
    }
  } catch (err) {
    next(err)
  }
})
