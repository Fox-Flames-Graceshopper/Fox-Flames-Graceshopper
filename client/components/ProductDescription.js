import React from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {connect} from 'react-redux'

class ProductDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 0}
  }
  addCart = e => {
    e.preventDefault()
    const productAndQuantity = {
      ...this.props.product,
      quantity: this.state.quantity
    }
    if (!this.props.user.id && !window.localStorage.cart) {
      window.localStorage.setItem('cart', JSON.stringify([productAndQuantity]))
      console.log(window.localStorage)
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'))
      // check if some productId was checked out
      let itemInCart = false
      cart.forEach(item => {
        if (item.id === productAndQuantity.id) itemInCart = true
      })
      let newCart = []
      if (itemInCart) {
        newCart = cart.map(item => {
          if (item.id === productAndQuantity.id) {
            item.quantity =
              Number(item.quantity) + Number(productAndQuantity.quantity)
          }
          return item
        })
      } else {
        cart.push(productAndQuantity)
        newCart = cart
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      console.log(window.localStorage)
    }
    console.log(JSON.parse(window.localStorage.getItem('cart')))
  }
  render() {
    const {product} = this.props
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
      <div key={product.id} className="product-description">
        <p>{product.name}</p>
        <img src={product.imageUrl} />
        <p>Category: {product.category}</p>
        <form>
          <label>Quantity</label>
          <select onChange={e => this.setState({quantity: e.target.value})}>
            {numArr.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <Popup
            trigger={
              <button type="button" className="button">
                {' '}
                Preview{' '}
              </button>
            }
            modal
          >
            {close => (
              <div id="modal">
                <h6>{product.name}</h6>
                <img src={product.imageUrl} />
                <p>{product.price}</p>
                <p>{product.description}</p>
                <button id="close" type="button" onClick={close}>
                  &times;
                </button>
                <Link to={`/products/${product.id}`}>
                  <button type="button">Product Details</button>
                </Link>
              </div>
            )}
          </Popup>
          <Link to={`/products/${product.id}`}>
            <button type="button">Product Details</button>
          </Link>
          <button type="submit" onClick={this.addCart}>
            Add to cart
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(ProductDescription)
