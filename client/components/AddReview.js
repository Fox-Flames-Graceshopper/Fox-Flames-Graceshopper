import React from 'react'
import {connect} from 'react-redux'
import {addNewReview} from '../store/singleProduct'
import Button from '@material-ui/core/Button'

class AddReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      reviewText: '',
      rating: 0,
      productId: this.props.product.id
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.addReview(this.state)
    this.setState({
      title: '',
      reviewText: '',
      rating: 0,
      productId: this.props.product.id
    })
  }

  render() {
    const {title, reviewText, rating} = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div>
        <h1>Edit Product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
          <label htmlFor="product">Title:</label>
          <input name="title" onChange={handleChange} value={title} />
          <br />

          <label htmlFor="reviewText">Review:</label>
          <input name="reviewText" onChange={handleChange} value={reviewText} />
          <br />

          <label htmlFor="rating">Rating:</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            onChange={handleChange}
            value={rating}
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
    reviews: state.singleProduct.reviews,
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addReview: review => dispatch(addNewReview(review))
  }
}

export default connect(mapState, mapDispatch)(AddReview)
