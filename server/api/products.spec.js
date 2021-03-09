const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe.only('Product Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  const testProduct = {
    id: 1,
    name: 'Super Great Test Product',
    price: 460.29,
    description: 'The Best Product Ever',
    category: 'men clothing',
    imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  }

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create(testProduct)
    })

    it('should GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      console.log(res)
      expect(res.body).to.be.an.an('array')
      expect(res.body[0].name).to.be.equal('Super Great Test Product')
    })
  })

  describe('/api/products/1', () => {
    beforeEach(() => {
      return Product.create(testProduct)
    })

    it('should GET /api/products/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an.an('object')
      expect(res.body.name).to.be.equal('Super Great Test Product')
    })
  })
})
