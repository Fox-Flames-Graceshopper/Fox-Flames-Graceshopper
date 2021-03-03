import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, email} = props

  return (
    <div>
      {user.isAdmin === true ? (
        <div>
          <img className="userImg" src={user.imageUrl} />
          <h3>Welcome back Admin, {user.email}</h3>
        </div>
      ) : (
        <div>
          <img className="userImg" src={user.imageUrl} />
          <h3>Welcome back, {user.email}</h3>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
