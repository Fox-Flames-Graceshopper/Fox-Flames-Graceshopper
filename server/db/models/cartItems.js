/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('Cart_Items', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = CartItems
