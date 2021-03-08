import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserThunk} from '../store/allUsersAdminView'

//should be able to see all users info
//should be able to delete them
//should be able to see their current cart and also past order history

class AllUsersAdminView extends React.Component {
  componentDidMount() {
    this.props.fetchUserThunk()
  }

  render() {
    if (!this.props.user.isAdmin) {
      return <Redirect to="/" />
    }
    return (
      <div id="user">
        <h1>hello from the All Users Admin View</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsersAdminView,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUserThunk: () => dispatch(fetchUserThunk())
  }
}

export default connect(mapState, mapDispatch)(AllUsersAdminView)
