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
    } else if (req.body.deleteItem) {
      const {userId, productId} = req.body
      const cartData = await Cart.findOne({
        where: {
          userId,
          isPurchased: false
        }
      })
      let cartId = cartData.dataValues.id
      await CartItems.destroy({
        where: {
          cartId,
          productId
        }
      })
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

router.delete('/:id', async (req, res, next) => {
  try {
    console.log('hello from delete')
    console.log(req.body)
    const {userId, productId} = req.body
    const cartData = await Cart.findOne({
      where: {
        userId,
        isPurchased: false
      }
    })
    let cartId = cartData.dataValues.id
    await CartItems.destroy({
      where: {
        cartId,
        productId
      }
    })
    // const updatedCart = await Cart.findOne({
    //   where: {
    //     id: cartId
    //   },
    //   include: {
    //     all: true
    //   }
    // })
    const updatedCart = await CartItems.findOne({
      where: {
        cartId
      }
    })
    res.send(updatedCart)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
