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
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    const onRender = {name: '', price: 0, imageUrl: '', description: ''}
    const product = this.props.product || onRender
    return (
      <div>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
        <div>Price: {product.price}</div>
        <div>
          <p>Description: {product.description}</p>
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