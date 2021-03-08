/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')
const User = db.model('user')

describe.only('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create cart', () => {
    let cody
    let newCart
    let codysCart
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      newCart = await Cart.create()
      codysCart = await Cart.findOne({where: {userId: cody.id}})
    })
    it('associates user with cart upon user creation', () => {
      expect(codysCart.userId).to.equal(cody.id)
      expect(newCart).to.be.a('object')
      expect(newCart.isPurchased).to.equal(false)
    })
  })
})
