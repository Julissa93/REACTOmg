import socket from '../socket'

/**
 * ACTION TYPES
 */
const UPDATE_WHITEBOARD_DATA = 'UPDATE_WHITEBOARD_DATA'

/**
 * INITIAL STATE
 */
const defaultWhiteboardData = '{"version":"3.6.3","objects":[]}' //Empty canvas

/**
 * ACTION CREATORS
 */
export const sentWhiteboardData = whiteboardData => ({
  type: UPDATE_WHITEBOARD_DATA,
  whiteboardData
})

export const sendWhiteboardData = (whiteboardData, room) => dispatch => {
  try {
    dispatch(sentWhiteboardData(whiteboardData))
    socket.emit('new-WBData-in-room', whiteboardData, room)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultWhiteboardData, action) {
  switch (action.type) {
    case UPDATE_WHITEBOARD_DATA:
      return action.whiteboardData
    default:
      return state
  }
}
