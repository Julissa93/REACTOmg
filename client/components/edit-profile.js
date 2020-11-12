import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store'

const EditProfile = props => {
  const [email, setEmail] = useState('')

  const {updateUser} = props

  const handleSubmit = evt => {
    evt.preventDefault()
    updateUser(email)
    setEmail('')
  }

  return (
    <div>
      <h3>Edit Profile</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn btn-login">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: email => dispatch(updateUser(email))
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
