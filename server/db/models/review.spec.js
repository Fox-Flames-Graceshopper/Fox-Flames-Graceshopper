/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')
const Product = db.model('product')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create review', () => {
    let review1
    let product1
    beforeEach(async () => {
      review1 = await Review.create({
        title: 'Good product',
        reviewText: 'Testing this is a good product',
        rating: 5
      })
      product1 = await Product.create({
        name: 'test name',
        price: 100,
        description: 'test description for product1',
        category: 'electronics',
        imageUrl: 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg'
      })
      // await product1.setReviews(review1)
      // await review1.setProduct(product1)
      // console.log(review1)
      // console.log(Product.prototype)
      console.log(Review.prototype)
    })
    it('returns an object if created successfully', () => {
      expect(review1).to.be.a('object')
      expect(review1.title).to.equal('Good product')
      expect(review1.reviewText).to.equal('Testing this is a good product')
      expect(review1.rating).to.equal(5)
      expect(review1.productId).to.equal(product1.id)
    })
  })
})
