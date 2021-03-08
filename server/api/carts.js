const router = require('express').Router()
const {Cart, User} = require('../db/models')

router.put('/:id', async (req, res, next) => {
  try {
    let user = await Cart.update(
      {isPurchased: false},
      {
        where: {
          userId: req.params.id
        },
        returning: true
      }
    )
    console.log('this is the user', user)
    res.send(user)
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
