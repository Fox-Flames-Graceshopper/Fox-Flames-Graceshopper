import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/adminProduct'
import Button from '@material-ui/core/Button'
import Popup from 'reactjs-popup'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addProductThunk(this.state)
    this.setState({
      name: this.props.product.name,
      price: this.props.product.price,
      description: this.props.product.description,
      id: this.props.product.id
    })
  }

  render() {
    const {name, price, description, category, imageUrl} = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div>
        <div className="preview-product-div">
          <Popup
            trigger={
              <button type="button" className="add-new-Product-button">
                {' '}
                Add New Product{' '}
              </button>
            }
            modal
          >
            {close => (
              <div id="modal">
                <div>
                  <h1>Add New Product</h1>
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

                    <label htmlFor="category">Category:</label>
                    <input
                      name="category"
                      onChange={handleChange}
                      value={category}
                    />
                    <br />

                    <label htmlFor="imageUrl">ImageUrl:</label>
                    <input
                      name="imageUrl"
                      onChange={handleChange}
                      value={imageUrl}
                    />
                    <br />

                    <button type="submit">Submit</button>

                    <Button
                      variant="contained"
                      id="close"
                      type="button"
                      onClick={close}
                    >
                      x
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </Popup>
        </div>
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
    addProductThunk: (product, productId) =>
      dispatch(addProductThunk(product, productId))
  }
}

export default connect(mapState, mapDispatch)(AddProduct)
