import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

class SingleProduct extends Component {
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

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    console.log('rendering')
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
    return (
      <div id="single-Product">
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
            <Button variant="contained" endIcon={<ShoppingCartIcon />}>
              Add to cart
            </Button>
          </form>
        </div>
        <div>
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
    loadSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
