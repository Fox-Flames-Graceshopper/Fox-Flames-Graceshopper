const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  cartItems: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Cart
