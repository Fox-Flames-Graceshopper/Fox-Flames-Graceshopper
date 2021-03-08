import React from 'react'
import {connect} from 'react-redux'
import {editProductThunk} from '../store/adminProduct'
import Button from '@material-ui/core/Button'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.product.name,
      price: this.props.product.price,
      description: this.props.product.description,
      id: this.props.product.id
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    this.props.editProduct(this.state, this.props.product.id)
    this.setState({
      name: this.props.product.name,
      price: this.props.product.price,
      description: this.props.product.description,
      id: this.props.product.id
    })
  }

  render() {
    const {name, price, description} = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div>
        <h1>Edit Product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
          <label htmlFor="product">Product Name:</label>
          <input name="name" onChange={handleChange} value={name} />
          <br />

          <label htmlFor="price">Price:</label>
          <input name="price" onChange={handleChange} value={price} />
          <br />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    editProduct: (product, productId) =>
      dispatch(editProductThunk(product, productId))
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
