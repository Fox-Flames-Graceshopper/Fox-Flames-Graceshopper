import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends Component {
  //placeholder in case we need state in the future
  // constructor() {
  //   super()
  //   this.state = {

  //   }
  // }

  componentDidMount() {
    console.log('mounting')
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    console.log('rendering')
    const onRender = {
      name: '',
      price: 0,
      imageUrl: 'shorturl.at/gsJS2',
      description: ''
    }
    const product = this.props.product || onRender
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
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    //will need to be assigned in combine reducer
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
