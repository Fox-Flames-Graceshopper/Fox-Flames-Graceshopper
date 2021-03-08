const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const isAdmin = function(req, res, next) {
  if (!req.user) {
    return res.status(403).send()
  }
  if (req.user.dataValues.isAdmin) {
    next()
  }
  res.status(403).send()
}

//add new product
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl
    })
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
