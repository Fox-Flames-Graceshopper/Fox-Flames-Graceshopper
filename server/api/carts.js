const router = require('express').Router()
const {Cart, User} = require('../db/models')

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
    // const productList = data.products.map((value) => {
    //   return {
    //     id: value.id,
    //     name: value.name,
    //     description: value.description,
    //     category: value.category,
    //     quantity: value.Cart_Items.quantity,
    //   }
    // })
    // const data2 = await User.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    //   include: {
    //     all: true,
    //   },
    // })

    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
