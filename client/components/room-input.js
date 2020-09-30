import React, {Component} from 'react'

export default class RoomInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.room.length) {
      this.props.handleRoomSubmit(this.state.room)
      this.setState({room: ''})
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Room Code:
          <input
            type="text"
            value={this.state.room}
            name="room"
            placeholder="Enter Room Code"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Join" />
      </form>
    )
  }
}
