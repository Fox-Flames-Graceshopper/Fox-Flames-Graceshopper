/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import ProductDescription from './ProductDescription'
import Button from '@material-ui/core/Button'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      filterItems: [],
      category: ''
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  changeCategory = async e => {
    console.log('inside change category, category:', e.target.value)
    let value = e.target.value === 'All Products' ? '' : e.target.value
    await this.setState({...this.state, category: value})
    this.filterChange()
  }
  handleInputChange = async e => {
    await this.setState({
      ...this.state,
      input: e.target.value
    })
    this.filterChange()
  }
  filterChange = async () => {
    let input = this.state.input.toLowerCase()
    let category = this.state.category
    let filterData = []
    filterData = this.props.products.filter(info => {
      let name = info.name.toLowerCase()
      return category === ''
        ? name.includes(input)
        : input === ''
          ? info.category === category
          : name.includes(input) && info.category === category
    })
    await this.setState({...this.state, filterItems: filterData})
  }
  render() {
    const {input, filterItems, category} = this.state
    const {products} = this.props
    const categories = ['All Products']
    products.forEach(product => {
      if (!categories.includes(product.category))
        categories.push(product.category)
    })

    return (
      <div id="products-page-container">
        <form>
          <input
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Search items..."
          />
          <br />
          {categories.map((category, i) => {
            return (
              // <Button
              //   key={i}
              //   type="button"
              //   value={category}
              //   onClick={this.changeCategory}
              //   variant="contained"
              // >
              //   {category}
              // </Button>
              <button
                className="category-button"
                key={i}
                type="button"
                value={category}
                onClick={this.changeCategory}
              >
                {category}
              </button>
            )
          })}
        </form>
        <div id="all-products-container">
          {input === '' && category === ''
            ? products &&
              products.map(product => {
                return <ProductDescription product={product} />
              })
            : filterItems.map(product => {
                return <ProductDescription product={product} />
              })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
