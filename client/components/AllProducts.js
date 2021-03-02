import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div>
        {this.props.products &&
          this.props.products.map(product => {
            return (
              <div key={product.id}>
                <p>{product.name}</p>
                <img src={product.imageUrl} />
                <p>{product.description}</p>
                <p>{product.category}</p>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
