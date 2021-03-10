import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import EditProduct from './EditProduct'
import AddReview from './AddReview'
import Popup from 'reactjs-popup'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {updateSingleItem} from '../store/checkout'

class SingleProduct extends Component {
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
      console.log(singleItem)
      this.props.updateSingleItem(this.props.user.id, singleItem)
    }
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    const onRender = {
      name: '',
      price: 0,
      imageUrl: 'shorturl.at/gsJS2',
      description: '',
      reviews: []
    }
    const product = this.props.product || onRender
    const reviews = this.props.product.reviews
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(this.state)
    return (
      <div id="single-Product">
        <div id="edit-product-div">
          {this.props.user.isAdmin ? (
            <Popup
              trigger={
                <Button
                  variant="contained"
                  type="button"
                  className="edit-button"
                >
                  {' '}
                  Edit Product{' '}
                </Button>
              }
              modal
            >
              {close => (
                <div id="modal">
                  <EditProduct />
                  <div id="popup-x-productDetail-div">
                    <Button
                      variant="contained"
                      id="close"
                      type="button"
                      onClick={close}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
          ) : (
            <div />
          )}
          <div id="single-product-pic">
            <img src={product.imageUrl} />
          </div>
          <div id="single-product-info">
            <h2>{product.name}</h2>
            <h3>Price: {product.price}</h3>
            <div>
              <h5>Description:</h5>
              <p>{product.description}</p>
            </div>
            <form>
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
          </div>
          <br />
          <div>
            <div id="put-reviews-here">
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    type="button"
                    className="edit-button"
                  >
                    {' '}
                    Add Review{' '}
                  </Button>
                }
                modal
              >
                {close => (
                  <div id="modal">
                    <AddReview />
                    <div id="popup-x-productDetail-div">
                      <Button
                        variant="contained"
                        id="close"
                        type="button"
                        onClick={close}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
            <br />
            <h3>Reviews:</h3>
            <br />
            <div>
              {reviews
                ? reviews.map(rev => (
                    <div key={rev.id}>
                      <h5>{rev.title}</h5>
                      <h5>Rating: {rev.rating} out of 5</h5>
                      <p>{rev.reviewText}</p>
                      <br />
                    </div>
                  ))
                : 'No Reviews'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    //will need to be assigned in combine reducer
    product: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    updateSingleItem: (userId, singleItem) =>
      dispatch(updateSingleItem(userId, singleItem))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
