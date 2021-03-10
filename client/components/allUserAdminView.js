import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserThunk, deleteUserThunk} from '../store/allUsersAdminView'

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
        {this.props.users.map(currentUser => {
          return (
            <div key={currentUser.id}>
              {currentUser.email}
              <button
                type="button"
                onClick={() => this.props.deleteUserThunk(currentUser.id)}
              >
                Delete
              </button>
            </div>
          )
        })}
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
    fetchUserThunk: () => dispatch(fetchUserThunk()),
    deleteUserThunk: userId => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(AllUsersAdminView)
