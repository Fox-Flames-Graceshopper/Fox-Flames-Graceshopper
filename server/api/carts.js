const router = require('express').Router()
const {Cart, User} = require('../db/models')
const {Product} = require('../db/models')
const CartItems = require('../db/models/cartItems')

router.put('/:id', async (req, res, next) => {
  try {
    let updateCart = []
    if (req.body.isSingleItem) {
      let {userId, singleItem} = req.body
      let {product, quantity} = singleItem
      const cartData = await Cart.findOne({
        where: {
          userId,
          isPurchased: false
        }
      })
      let cartId = cartData.dataValues.id
      let cartItemDetails = await CartItems.findOne({
        where: {cartId, productId: product}
      })
      if (!cartItemDetails) {
        let addItemToCart = await CartItems.create({
          cartId,
          productId: product,
          quantity
        })
      } else {
        let oldQuantity = cartItemDetails.dataValues.quantity
        CartItems.update(
          {quantity: oldQuantity + quantity},
          {
            where: {
              cartId,
              productId: product
            }
          }
        )
      }
      updateCart = CartItems.findAll({
        where: {
          cartId
        }
      })
    } else {
      let productDetail = req.body.products
      console.log('this is the req body', productDetail)
      updateCart = await Promise.all(
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
    }

    res.json(updateCart)
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
