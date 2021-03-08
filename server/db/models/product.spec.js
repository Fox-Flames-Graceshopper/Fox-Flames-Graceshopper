/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create product', () => {
    let product1
    beforeEach(async () => {
      product1 = await Product.create({
        name: 'test name',
        price: 100,
        description: 'test description for product1',
        category: 'electronics',
        imageUrl: 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg'
      })
    })
    it('returns an object if created successfully', () => {
      expect(product1).to.be.a('object')
      expect(product1.name).to.equal('test name')
      expect(product1.price).to.equal(100)
      expect(product1.description).to.equal('test description for product1')
      expect(product1.category).to.equal('electronics')
      expect(product1.imageUrl).to.equal(
        'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg'
      )
    })
  })
})
