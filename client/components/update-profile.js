import React from 'react'
import {connect} from 'react-redux'

const UpdateProfile = props => {
  const {email} = props.user
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UpdateProfile)
