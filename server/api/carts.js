const router = require('express').Router()
const {Cart} = require('../db/models')

// api/testApi
router.get('/:id', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {
        id: req.params.id
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

    res.send(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
