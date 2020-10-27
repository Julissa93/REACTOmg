import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="nav-container">
      <Link to="/home" className="nav-item logo">
        Anansi
      </Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-item nav-link">
            Home
          </Link>
          <button onClick={handleClick} className="btn btn-logout">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          {/* The navbar will show these links before you log in */}
          <Link
            to={`/editor/${Math.random()
              .toString(36)
              .substring(5, 10)}`}
            className="nav-item nav-link"
          >
            Code Editor
          </Link>
          <Link to="/login" className="nav-item nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-item nav-link">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
