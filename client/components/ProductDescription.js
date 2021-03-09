import React from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {deleteProductThunk} from '../store/adminProduct'
import {updateSingleItem} from '../store/checkout'

class ProductDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
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
    }
    if (this.props.user.id) {
      let singleItem = {
        product: this.props.product.id,
        quantity: this.state.quantity
      }
      this.props.updateSingleItem(this.props.user.id, singleItem)
    }
  }
  render() {
    const {product} = this.props
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
      <div key={product.id} className="product-description">
        {this.props.user.isAdmin ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.deleteProductThunk(product.id)}
          >
            delete
          </Button>
        ) : (
          <div />
        )}
        <p className="product-name">{product.name}</p>
        <img src={product.imageUrl} />
        <p>Category: {product.category}</p>
        <form className="quantity-addCart-div">
          <label>Quantity</label>
          <select onChange={e => this.setState({quantity: e.target.value})}>
            {numArr.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <Button
            variant="contained"
            endIcon={<ShoppingCartIcon />}
            onClick={this.addCart}
          >
            Add to cart
          </Button>
        </form>
        <div className="preview-product-div">
          <Popup
            trigger={
              <button type="button" className="preview-button">
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
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <div className="popup-x-productDetail-div">
                  <button id="close" type="button" onClick={close}>
                    &times;
                  </button>

                  <Link to={`/products/${product.id}`}>
                    <button type="button">Product Details</button>
                  </Link>
                </div>
              </div>
            )}
          </Popup>
          <Link className="product-view-link" to={`/products/${product.id}`}>
            <Button variant="contained">Product Details</Button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    deleteProductThunk: productId => dispatch(deleteProductThunk(productId)),
    updateSingleItem: (userId, singleItem) =>
      dispatch(updateSingleItem(userId, singleItem))
  }
}

export default connect(mapState, mapDispatch)(ProductDescription)
