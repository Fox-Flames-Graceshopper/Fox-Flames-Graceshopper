const router = require('express').Router()
const {Cart, User} = require('../db/models')
const {Product} = require('../db/models')
const CartItems = require('../db/models/cartItems')

router.put('/:id', async (req, res, next) => {
  try {
    let productDetail = req.body.products
    console.log('this is the req body', productDetail)
    const updateCart = await Promise.all(
      productDetail.map(product => {
        return CartItems.update(
          {quantity: product.Cart_Items.quantity},
          {
            where: {
              cartId: product.Cart_Items.cartId,
              productId: product.Cart_Items.productId
            }
          }
        )
      })
    )

    res.json(updateCart)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.put('/merge/:id', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({where: {userId: req.params.id}})
    await cart.addProducts([...req.body.products])
    res.json(cart)

    res.json(cart)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//delete based on cart it
router.get('/:id', async (req, res, next) => {
  try {
    let user = await Cart.findOne({
      where: {
        id: req.params.id
      },
      include: Product
    })
    res.json(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// api/testApi
router.get('/:id', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {
        userId: req.params.id
      },
      include: {
        all: true
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
